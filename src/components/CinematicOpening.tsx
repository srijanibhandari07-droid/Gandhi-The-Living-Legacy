import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { extractMasterFineArtStrokes, MasterStroke } from '../utils/portraitStrokeEngine';
import { ASSET_IMAGES } from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

interface CinematicOpeningProps {
  onEnterExperience: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 840;

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({
  onEnterExperience,
  audioEnabled,
  onToggleAudio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Master strokes collection extracted from photographic reference
  const [strokes, setStrokes] = useState<MasterStroke[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [currentStrokeIdx, setCurrentStrokeIdx] = useState<number>(0);
  const [currentStageLabel, setCurrentStageLabel] = useState<string>('Stage 1: Pentimenti & 2H Silverpoint Construction');
  const [currentToolName, setCurrentToolName] = useState<string>('2H Silverpoint Pencil');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [paperRevealed, setPaperRevealed] = useState<boolean>(false);
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);

  // Virtual Artist Pencil state
  const [instrumentState, setInstrumentState] = useState<{
    x: number;
    y: number;
    angle: number;
    isPenDown: boolean;
    toolType: 'pencil' | 'chalk' | 'carbon' | 'silverpoint';
    pressure: number;
    visible: boolean;
  }>({
    x: 350,
    y: 80,
    angle: -24,
    isPenDown: false,
    toolType: 'silverpoint',
    pressure: 0.5,
    visible: true,
  });

  // Animation Loop Refs
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const strokeIdxRef = useRef<number>(0);
  const isLiftingRef = useRef<boolean>(true);
  const strokeElapsedMsRef = useRef<number>(0);
  const liftElapsedMsRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(true);
  const speedRef = useRef<number>(1);
  const lastSoundTimeRef = useRef<number>(0);
  const strokesRef = useRef<MasterStroke[]>([]);

  // Keep refs synchronized
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    strokesRef.current = strokes;
  }, [strokes]);

  // Initial cinematic paper reveal from black canvas
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaperRevealed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Render warm Arches 300gsm cold-pressed cotton drawing paper onto context
  const renderTexturedPaper = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#f8f4eb';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Subtle studio easel spotlight gradient
    const grad = ctx.createRadialGradient(
      CANVAS_WIDTH * 0.48, CANVAS_HEIGHT * 0.44, 70,
      CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5, CANVAS_WIDTH * 0.75
    );
    grad.addColorStop(0, 'rgba(255, 253, 246, 0.98)');
    grad.addColorStop(0.6, 'rgba(247, 241, 227, 0.94)');
    grad.addColorStop(1, 'rgba(234, 222, 202, 0.96)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Microscopic cotton paper tooth & fibers
    ctx.fillStyle = 'rgba(135, 110, 80, 0.038)';
    for (let i = 0; i < 700; i++) {
      const rx = (Math.sin(i * 997) * 0.5 + 0.5) * CANVAS_WIDTH;
      const ry = (Math.cos(i * 613) * 0.5 + 0.5) * CANVAS_HEIGHT;
      ctx.fillRect(rx, ry, (i % 3) + 1, 1);
    }
  };

  // Initialize both visible and offscreen canvases
  const initCanvases = useCallback(() => {
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) return;
    const mainCtx = mainCanvas.getContext('2d');
    if (!mainCtx) return;

    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
      offscreenCanvasRef.current.width = CANVAS_WIDTH;
      offscreenCanvasRef.current.height = CANVAS_HEIGHT;
    }
    const offCtx = offscreenCanvasRef.current.getContext('2d');
    if (!offCtx) return;

    renderTexturedPaper(offCtx);
    mainCtx.drawImage(offscreenCanvasRef.current, 0, 0);
  }, []);

  useEffect(() => {
    initCanvases();
  }, [initCanvases]);

  // Extract reference strokes from authentic master historical portrait
  useEffect(() => {
    const img = new Image();
    img.src = ASSET_IMAGES.portrait;
    img.onload = () => {
      try {
        const offCanvas = document.createElement('canvas');
        const sampleW = 200;
        const sampleH = 240;
        offCanvas.width = sampleW;
        offCanvas.height = sampleH;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) return;

        offCtx.drawImage(img, 0, 0, sampleW, sampleH);
        const imgData = offCtx.getImageData(0, 0, sampleW, sampleH);
        const extracted = extractMasterFineArtStrokes(imgData, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (extracted.length > 300) {
          setStrokes(extracted);
          strokesRef.current = extracted;
        }
      } catch {
        // Fallback
      }
    };
  }, []);

  // Compute exact position, angle, and pressure along stroke at progress t
  const getStrokePointAt = (
    points: Array<{ x: number; y: number; pressure: number }>,
    t: number
  ): { x: number; y: number; angle: number; pressure: number } => {
    if (points.length <= 1) {
      return { x: points[0].x, y: points[0].y, angle: -24, pressure: points[0].pressure || 0.5 };
    }

    const totalSegs = points.length - 1;
    const segFloat = t * totalSegs;
    const segIdx = Math.min(Math.floor(segFloat), totalSegs - 1);
    const segT = segFloat - segIdx;

    const p0 = points[segIdx];
    const p1 = points[segIdx + 1];

    const x = p0.x + (p1.x - p0.x) * segT;
    const y = p0.y + (p1.y - p0.y) * segT;
    const angle = (Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180) / Math.PI;
    const pressure = p0.pressure + (p1.pressure - p0.pressure) * segT;

    return { x, y, angle, pressure };
  };

  // Draw pressure-sensitive partial stroke
  const drawPartialStroke = (ctx: CanvasRenderingContext2D, stroke: MasterStroke, t: number) => {
    if (t <= 0 || stroke.points.length <= 1) return;

    const totalSegs = stroke.points.length - 1;
    const segFloat = t * totalSegs;
    const targetIdx = Math.min(Math.floor(segFloat), totalSegs - 1);
    const segT = segFloat - targetIdx;

    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < targetIdx; i++) {
      const p0 = stroke.points[i];
      const p1 = stroke.points[i + 1];
      ctx.lineWidth = stroke.width * (p0.pressure || 1.0);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }

    if (targetIdx < totalSegs) {
      const p0 = stroke.points[targetIdx];
      const p1 = stroke.points[targetIdx + 1];
      const curX = p0.x + (p1.x - p0.x) * segT;
      const curY = p0.y + (p1.y - p0.y) * segT;
      const curP = p0.pressure + (p1.pressure - p0.pressure) * segT;

      ctx.lineWidth = stroke.width * curP;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(curX, curY);
      ctx.stroke();
    }

    ctx.restore();
  };

  // Commit completed stroke permanently into offscreen canvas buffer
  const commitFullStroke = (stroke: MasterStroke) => {
    const offscreen = offscreenCanvasRef.current;
    if (!offscreen) return;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.save();
    offCtx.strokeStyle = stroke.color;
    offCtx.lineCap = 'round';
    offCtx.lineJoin = 'round';

    for (let i = 0; i < stroke.points.length - 1; i++) {
      const p0 = stroke.points[i];
      const p1 = stroke.points[i + 1];
      offCtx.lineWidth = stroke.width * (p0.pressure || 1.0);
      offCtx.beginPath();
      offCtx.moveTo(p0.x, p0.y);
      offCtx.lineTo(p1.x, p1.y);
      offCtx.stroke();
    }

    offCtx.restore();
  };

  // Master live requestAnimationFrame loop
  useEffect(() => {
    const loop = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }
      const rawDelta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      if (!isPlayingRef.current) {
        animFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      const deltaMs = Math.min(rawDelta, 100) * speedRef.current;
      const strokeList = strokesRef.current;
      const idx = strokeIdxRef.current;

      const mainCanvas = canvasRef.current;
      const offscreen = offscreenCanvasRef.current;

      if (!mainCanvas || !offscreen || strokeList.length === 0) {
        animFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      const mainCtx = mainCanvas.getContext('2d');
      if (!mainCtx) {
        animFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      // Check completion
      if (idx >= strokeList.length) {
        setIsFinished(true);
        setIsPlaying(false);
        setInstrumentState((prev) => ({ ...prev, isPenDown: false, visible: false }));
        return;
      }

      const curStroke = strokeList[idx];
      setCurrentStageLabel(curStroke.stageTitle);
      setCurrentToolName(curStroke.toolName);
      setProgressPercent(Math.round((idx / strokeList.length) * 100));

      const toolType =
        curStroke.toolType === 'white-chalk'
          ? 'chalk'
          : curStroke.toolType === '4B-carbon'
          ? 'carbon'
          : curStroke.toolType === '2H-silverpoint'
          ? 'silverpoint'
          : 'pencil';

      // CASE A: PEN IS LIFTED OFF PAPER & MOVING TO NEXT STROKE
      if (isLiftingRef.current) {
        liftElapsedMsRef.current += deltaMs;
        const liftDuration = curStroke.liftDurationMs;
        const flightT = Math.min(1, liftElapsedMsRef.current / liftDuration);

        const startPt = idx > 0 ? strokeList[idx - 1].points[strokeList[idx - 1].points.length - 1] : { x: 350, y: 80 };
        const endPt = curStroke.points[0];

        // Smooth parabolic flight arc
        const curX = startPt.x + (endPt.x - startPt.x) * flightT;
        const curY = startPt.y + (endPt.y - startPt.y) * flightT - Math.sin(flightT * Math.PI) * 16;
        const angle = -24 + Math.sin(flightT * Math.PI) * 10;

        setInstrumentState({
          x: curX,
          y: curY,
          angle,
          isPenDown: false,
          toolType,
          pressure: 0.3,
          visible: true,
        });

        // Copy offscreen canvas
        mainCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        mainCtx.drawImage(offscreen, 0, 0);

        if (flightT >= 1) {
          isLiftingRef.current = false;
          liftElapsedMsRef.current = 0;
          strokeElapsedMsRef.current = 0;
        }
      } 
      // CASE B: PEN IS DOWN ON PAPER & DRAWING
      else {
        strokeElapsedMsRef.current += deltaMs;
        const drawDuration = curStroke.drawDurationMs;
        const drawT = Math.min(1, strokeElapsedMsRef.current / drawDuration);

        const curPos = getStrokePointAt(curStroke.points, drawT);

        setInstrumentState({
          x: curPos.x,
          y: curPos.y,
          angle: curPos.angle - 28,
          isPenDown: true,
          toolType,
          pressure: curPos.pressure,
          visible: true,
        });

        // Acoustic sound synchronized with drawing pressure
        const now = performance.now();
        if (now - lastSoundTimeRef.current > 90 / speedRef.current) {
          soundscape.playPenScratch(speedRef.current);
          lastSoundTimeRef.current = now;
        }

        mainCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        mainCtx.drawImage(offscreen, 0, 0);
        drawPartialStroke(mainCtx, curStroke, drawT);

        if (drawT >= 1) {
          commitFullStroke(curStroke);

          strokeIdxRef.current = idx + 1;
          setCurrentStrokeIdx(idx + 1);
          isLiftingRef.current = true;
          liftElapsedMsRef.current = 0;
          strokeElapsedMsRef.current = 0;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Controls: Pause and Resume
  const handleTogglePause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Controls: Restart from blank paper
  const handleRestart = () => {
    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

    initCanvases();
    strokeIdxRef.current = 0;
    setCurrentStrokeIdx(0);
    isLiftingRef.current = true;
    strokeElapsedMsRef.current = 0;
    liftElapsedMsRef.current = 0;
    lastTimestampRef.current = null;
    setIsFinished(false);
    setIsPlaying(true);
    setProgressPercent(0);
    setInstrumentState({
      x: 350,
      y: 80,
      angle: -24,
      isPenDown: false,
      toolType: 'silverpoint',
      pressure: 0.5,
      visible: true,
    });
  };

  // Controls: Complete all strokes directly
  const handleSkip = () => {
    const offscreen = offscreenCanvasRef.current;
    const mainCanvas = canvasRef.current;
    if (!offscreen || !mainCanvas) return;

    const offCtx = offscreen.getContext('2d');
    const mainCtx = mainCanvas.getContext('2d');
    if (!offCtx || !mainCtx) return;

    renderTexturedPaper(offCtx);

    const strokeList = strokesRef.current;
    for (const stroke of strokeList) {
      commitFullStroke(stroke);
    }

    mainCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    mainCtx.drawImage(offscreen, 0, 0);

    strokeIdxRef.current = strokeList.length;
    setCurrentStrokeIdx(strokeList.length);
    setIsFinished(true);
    setIsPlaying(false);
    setProgressPercent(100);
    setInstrumentState((prev) => ({ ...prev, isPenDown: false, visible: false }));
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 md:p-8 bg-[#090806] overflow-hidden select-none">
      
      {/* Background Studio Easel Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#16120e] via-transparent to-[#060504] pointer-events-none" />

      {/* Main Studio Viewport */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Curatorial Header Ribbon */}
        <div className="mb-3 w-full max-w-[640px] flex flex-wrap items-center justify-between text-xs font-mono text-[#a99885] px-2 gap-2">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isFinished ? 'bg-emerald-400' : 'bg-[#d49755] animate-pulse'}`} />
            <span className="text-[#d49755] font-semibold">
              {isFinished ? 'Fine-Art Monochrome Study Completed' : currentStageLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-[#1c1712] border border-[#382b20] text-[#baa896] text-[10px]">
              {isFinished ? 'Signature Applied' : currentToolName}
            </span>
            <span className="text-[#8a7a67]">
              {isFinished ? '100%' : `${progressPercent}% Drawn · ${currentStrokeIdx}/${strokesRef.current.length} Marks`}
            </span>
          </div>
        </div>

        {/* Studio Drafting Easel & Hand-Made Paper Container */}
        <div
          className={`relative w-full max-w-[640px] aspect-[5/6] rounded-2xl shadow-2xl border-4 border-[#2b2118] overflow-hidden transition-all duration-1000 ease-out ${
            paperRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${isZoomedIn ? 'scale-110 z-20 shadow-3xl' : ''} bg-[#18130e]`}
        >
          {/* Vintage Brass Corner Drafting Brackets (Easel Mounts) */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#c5a059]/70 z-20 pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#c5a059]/70 z-20 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#c5a059]/70 z-20 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#c5a059]/70 z-20 pointer-events-none" />

          {/* Genuine Progressive HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-full block"
          />

          {/* Realistic Virtual Artist Instrument with Variable Pressure Shadow */}
          {instrumentState.visible && (
            <div
              className="absolute pointer-events-none transition-transform duration-75 ease-out z-30"
              style={{
                left: `${(instrumentState.x / CANVAS_WIDTH) * 100}%`,
                top: `${(instrumentState.y / CANVAS_HEIGHT) * 100}%`,
                transform: `translate(-12px, -94px) rotate(${instrumentState.angle}deg)`,
                transformOrigin: '12px 94px',
              }}
            >
              {/* Dynamic Pencil Contact Shadow */}
              <div
                className={`absolute rounded-full transition-all duration-150 ${
                  instrumentState.isPenDown
                    ? 'top-[92px] left-[10px] w-2.5 h-1.5 bg-[#140e0a]/80 blur-[0.6px]'
                    : 'top-[98px] left-[16px] w-5 h-2.5 bg-[#140e0a]/20 blur-[3px]'
                }`}
                style={{
                  transform: `scale(${instrumentState.pressure || 0.8})`,
                }}
              />

              {/* Dynamic Traditional Drawing Instrument SVGs */}
              {instrumentState.toolType === 'chalk' ? (
                /* White Conté Crayon */
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path d="M12 92 L18 88 L85 22 L79 16 L12 82 Z" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="1" />
                  <path d="M12 82 L12 92 L6 102 L4 100 Z" fill="#ffffff" stroke="#e4e4e7" strokeWidth="0.8" />
                  <circle cx="5" cy="101" r="1.5" fill="#ffffff" />
                </svg>
              ) : instrumentState.toolType === 'carbon' ? (
                /* Matte Velvet 6B Carbon Drawing Pencil */
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path d="M12 92 L18 88 L85 22 L79 16 L12 82 Z" fill="#18181b" stroke="#09090b" strokeWidth="1" />
                  <path d="M12 82 L12 92 L7 100 L5 98 Z" fill="#d2b48c" stroke="#8b7355" strokeWidth="0.8" />
                  <path d="M7 100 L5 98 L3 103 L6 103 Z" fill="#09090b" stroke="#000" strokeWidth="0.8" />
                  <circle cx="3.5" cy="103" r="1.4" fill="#000000" />
                </svg>
              ) : instrumentState.toolType === 'silverpoint' ? (
                /* Fine Metallic Silverpoint Stylus */
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path d="M12 92 L16 88 L82 22 L78 18 L12 84 Z" fill="#71717a" stroke="#3f3f46" strokeWidth="1" />
                  <path d="M12 84 L12 92 L6 101 L4 99 Z" fill="#a1a1aa" stroke="#52525b" strokeWidth="0.8" />
                  <circle cx="5" cy="100" r="1.0" fill="#52525b" />
                </svg>
              ) : (
                /* Traditional Hexagonal Cedar Drawing Pencil */
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path d="M12 92 L18 88 L85 22 L79 16 L12 82 Z" fill="#b8860b" stroke="#5a3d00" strokeWidth="1" />
                  <path d="M18 88 L85 22 L82 19 L15 85 Z" fill="#d4af37" opacity="0.8" />
                  <path d="M12 82 L12 92 L7 100 L5 98 Z" fill="#d2b48c" stroke="#8b7355" strokeWidth="0.8" />
                  <path d="M7 100 L5 98 L3 103 L6 103 Z" fill="#262626" stroke="#000" strokeWidth="0.8" />
                  <circle cx="3.5" cy="103" r="1.2" fill="#171717" />
                </svg>
              )}
            </div>
          )}

          {/* Archival Seal & Inscription */}
          <div className="absolute bottom-3 right-3 text-right pointer-events-none opacity-60">
            <span className="font-cinzel text-[9px] tracking-widest uppercase text-[#5c4f3f] block">
              Historical Graphite Archive
            </span>
            <span className="font-mono text-[8px] text-[#7a6a57]">
              ARCHES 300GSM COLD-PRESS · {currentStrokeIdx} / {strokesRef.current.length} MARKS
            </span>
          </div>
        </div>

        {/* Working Playback Controls Toolbar */}
        <div className="mt-5 flex flex-wrap items-center justify-between w-full max-w-[640px] px-2 text-xs text-[#a99885] gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleTogglePause}
              disabled={isFinished}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c1813] hover:bg-[#28221b] text-[#e8dfd1] border border-[#3a3026] transition-colors cursor-pointer disabled:opacity-40"
              title={isPlaying ? 'Pause live drawing' : 'Resume live drawing'}
            >
              {isPlaying && !isFinished ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#d49755]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#d49755]" />
                  <span>Resume</span>
                </>
              )}
            </button>

            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c1813] hover:bg-[#28221b] text-[#e8dfd1] border border-[#3a3026] transition-colors cursor-pointer"
              title="Clear canvas to blank paper and restart drawing"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>

            {/* Speed Toggles */}
            <div className="flex items-center gap-1 bg-[#181410] border border-[#2d241c] p-0.5 rounded">
              {[0.5, 1, 2, 4].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeedMultiplier(spd)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    speedMultiplier === spd
                      ? 'bg-[#d49755] text-[#12100e] font-bold'
                      : 'text-[#8a7a67] hover:text-[#d6c7b6]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Studio Close-Up Toggle */}
            <button
              onClick={() => setIsZoomedIn(!isZoomedIn)}
              className="px-2.5 py-1.5 rounded bg-[#1c1813] hover:bg-[#28221b] text-[#e8dfd1] border border-[#3a3026] transition-colors cursor-pointer flex items-center gap-1"
              title={isZoomedIn ? 'Zoom out to easel' : 'Zoom in to paper grain'}
            >
              <Maximize2 className="w-3 h-3 text-[#d49755]" />
              <span className="hidden sm:inline text-[11px] font-mono">{isZoomedIn ? 'Easel' : 'Detail'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {!isFinished && (
              <button
                onClick={handleSkip}
                className="flex items-center gap-1 text-[#c27b38] hover:text-[#d49755] font-medium transition-colors cursor-pointer"
              >
                <span>Complete Drawing</span>
                <FastForward className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onToggleAudio}
              className="p-1.5 text-[#a99885] hover:text-[#faeedd] transition-colors cursor-pointer"
              title={audioEnabled ? 'Mute audio' : 'Enable ambient soundscape'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-[#d49755]" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Exhibition Inscription & Hero Callout */}
        <div className="mt-8 text-center max-w-2xl px-4">
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-[#faeedd]">
            MAHATMA GANDHI
          </h1>
          <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#d49755]">
            “The man may disappear. An idea can continue walking.”
          </p>
          <p className="mt-2 text-xs sm:text-sm text-[#baa896] leading-relaxed">
            One life. A thousand ideas. An endless legacy. Watch the authentic hand-drawn portrait created live from empty paper, then step inside the interactive museum of nonviolence.
          </p>

          {/* Cinematic "Enter the Experience" Button */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                soundscape.playChime();
                onEnterExperience();
              }}
              className="group flex items-center gap-3 px-7 py-3.5 bg-[#d49755] hover:bg-[#e5a863] text-[#12100e] font-cinzel font-bold text-sm tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <span>Enter the Experience</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  Brush, 
  RotateCcw, 
  Download, 
  Sliders, 
  Sparkles, 
  Layers, 
  SplitSquareVertical, 
  Printer, 
  ZoomIn, 
  ZoomOut,
  Palette
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

type BrushType = 'ink' | 'charcoal' | 'graphite' | 'sepia';

export const ArtistsStudio: React.FC = () => {
  const [brush, setBrush] = useState<BrushType>('ink');
  const [brushSize, setBrushSize] = useState<number>(3);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.85);
  const [compareSplit, setCompareSplit] = useState<number>(50); // percentage 0 - 100
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [selectedPosterQuote, setSelectedPosterQuote] = useState<string>(
    'My life is my message.'
  );
  const [dedicationName, setDedicationName] = useState<string>('A Global Seeker of Peace');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize Canvas with blank paper texture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f7f2e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getBrushColor = () => {
    switch (brush) {
      case 'ink':
        return `rgba(26, 20, 16, ${brushOpacity})`;
      case 'charcoal':
        return `rgba(50, 42, 36, ${brushOpacity * 0.7})`;
      case 'graphite':
        return `rgba(90, 80, 72, ${brushOpacity * 0.6})`;
      case 'sepia':
        return `rgba(140, 95, 50, ${brushOpacity * 0.4})`;
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = getBrushColor();
    ctx.lineWidth = brushSize;
    soundscape.playPenScratch();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineTo(x, y);
    ctx.stroke();

    if (Math.random() > 0.6) {
      soundscape.playPenScratch();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f7f2e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Algorithmic master drawing replay
  const handleAutoDrawPortrait = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    handleClear();

    ctx.strokeStyle = 'rgba(28, 22, 17, 0.85)';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';

    const points = [
      { x: 180, y: 220 },
      { x: 230, y: 140 },
      { x: 320, y: 130 },
      { x: 410, y: 170 },
      { x: 440, y: 260 },
      { x: 430, y: 350 },
      { x: 380, y: 440 },
      { x: 250, y: 440 },
      { x: 190, y: 350 },
      { x: 180, y: 220 },
    ];

    let i = 0;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    const drawStep = () => {
      if (i < points.length - 1) {
        i++;
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
        soundscape.playPenScratch();
        setTimeout(drawStep, 90);
      } else {
        // Draw round spectacles
        ctx.beginPath();
        ctx.arc(245, 270, 36, 0, Math.PI * 2);
        ctx.arc(375, 270, 36, 0, Math.PI * 2);
        ctx.moveTo(281, 270);
        ctx.lineTo(339, 270);
        ctx.stroke();

        // Draw cross hatching
        for (let k = 0; k < 25; k++) {
          ctx.beginPath();
          ctx.moveTo(210 + k * 8, 330);
          ctx.lineTo(230 + k * 8, 370);
          ctx.stroke();
        }
      }
    };

    drawStep();
  };

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
              Fine Art & Creative Workshop
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[#faeedd] mt-1">
              THE ARTIST'S STUDIO
            </h2>
            <p className="font-serif italic text-base text-[#baa896] mt-1">
              Explore the drawing process through authentic ink, charcoal, split comparisons, and custom tribute posters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPosterModal(true)}
              className="px-4 py-2 rounded-lg bg-[#d49755] hover:bg-[#e5a863] text-[#12100e] text-xs font-cinzel font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Generate Tribute Poster</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Drawing & Comparison Canvas Column */}
          <div className="lg:col-span-8 space-y-4 flex flex-col items-center">
            
            {/* Split Comparison & Freehand Canvas Box */}
            <div className="relative w-full max-w-[620px] aspect-[4/5] rounded-xl border border-[#3e3428] shadow-2xl overflow-hidden bg-parchment">
              
              {/* Underneath: Finished Master Artwork for Before/After Slider */}
              <div className="absolute inset-0 select-none pointer-events-none">
                <img
                  src={ASSET_IMAGES.portrait}
                  alt="Finished Master Inking"
                  className="w-full h-full object-cover filter sepia-[0.35] brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Freehand Interactive Drawing Canvas (clipped by compareSplit slider) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${compareSplit}%` }}
              >
                <canvas
                  ref={canvasRef}
                  width={620}
                  height={775}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-[620px] h-[775px] max-w-none cursor-crosshair"
                />
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#d49755] shadow-lg pointer-events-none z-20"
                style={{ left: `${compareSplit}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#d49755] text-[#12100e] flex items-center justify-center shadow-md">
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Overlay Label Tags */}
              <div className="absolute top-3 left-3 bg-[#12100e]/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-[#faeedd] pointer-events-none z-30">
                Left: Interactive Drawing Canvas
              </div>
              <div className="absolute top-3 right-3 bg-[#12100e]/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-[#faeedd] pointer-events-none z-30">
                Right: Master Archival Reference
              </div>
            </div>

            {/* Split Comparison Scrubber Slider */}
            <div className="w-full max-w-[620px] px-2 flex items-center gap-3 text-xs text-[#baa896]">
              <span className="font-mono text-[11px] whitespace-nowrap">Canvas View</span>
              <input
                type="range"
                min="0"
                max="100"
                value={compareSplit}
                onChange={(e) => setCompareSplit(Number(e.target.value))}
                className="flex-1 accent-[#d49755] cursor-pointer"
              />
              <span className="font-mono text-[11px] whitespace-nowrap">Finished Study</span>
            </div>
          </div>

          {/* Right Column: Brushes, Thickness & Action Controls */}
          <div className="lg:col-span-4 bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 space-y-6">
            
            {/* Brush Media Palette */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#d49755] block mb-2">
                Historical Drawing Mediums
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'ink', label: 'Indian Ink Dip Pen', desc: 'Crisp hatching & deep darks' },
                  { id: 'charcoal', label: 'Vine Charcoal', desc: 'Soft velvety smoky texture' },
                  { id: 'graphite', label: '2B Graphite Pencil', desc: 'Subtle gray contour lines' },
                  { id: 'sepia', label: 'Archival Sepia Wash', desc: 'Aged parchment watercolor' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBrush(b.id as BrushType);
                      soundscape.playChime();
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      brush === b.id
                        ? 'bg-[#2b2118] border-[#d49755] text-[#faeedd] ring-1 ring-[#d49755]/30'
                        : 'bg-[#201a14] border-[#2d241c] text-[#baa896] hover:bg-[#282119]'
                    }`}
                  >
                    <span className="font-cinzel text-xs font-bold block text-[#faeedd]">
                      {b.label}
                    </span>
                    <span className="text-[10px] text-[#8a7a67] mt-0.5 block leading-tight">
                      {b.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stroke Thickness & Opacity Sliders */}
            <div className="space-y-4 border-t border-[#2d241c] pt-4">
              <div>
                <div className="flex justify-between text-xs text-[#baa896] mb-1 font-mono">
                  <span>Nib Width: {brushSize}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-[#d49755] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#baa896] mb-1 font-mono">
                  <span>Ink Density: {Math.round(brushOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={brushOpacity}
                  onChange={(e) => setBrushOpacity(Number(e.target.value))}
                  className="w-full accent-[#d49755] cursor-pointer"
                />
              </div>
            </div>

            {/* Algorithmic Engine & Clear Actions */}
            <div className="space-y-2 border-t border-[#2d241c] pt-4">
              <button
                onClick={handleAutoDrawPortrait}
                className="w-full py-2.5 rounded-lg bg-[#282017] hover:bg-[#382b20] border border-[#d49755]/50 text-xs font-cinzel font-semibold text-[#d49755] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Drawing Stroke-by-Stroke</span>
              </button>

              <button
                onClick={handleClear}
                className="w-full py-2 rounded-lg bg-[#201a14] hover:bg-[#2c241c] border border-[#2d241c] text-xs text-[#baa896] hover:text-[#faeedd] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Canvas to Fresh Paper</span>
              </button>
            </div>

          </div>

        </div>

        {/* ---------------- TRIBUTE POSTER GENERATOR MODAL ---------------- */}
        {showPosterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#1a1612] border border-[#3e3428] rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-[#2d241c] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-[#d49755]">
                    Archival Commemoration
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-[#faeedd]">
                    GENERATE TRIBUTE POSTER
                  </h3>
                </div>
                <button
                  onClick={() => setShowPosterModal(false)}
                  className="text-xs text-[#a99885] hover:text-[#faeedd] px-2 py-1"
                >
                  ✕ Close
                </button>
              </div>

              {/* Poster Preview Frame */}
              <div className="bg-[#f7f2e8] text-[#1c1611] p-6 rounded-lg border-4 border-[#3e3428] shadow-inner text-center space-y-4">
                <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#5a4c3d] block">
                  Commemorative Tribute Edition
                </span>
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#1c1611] shadow">
                  <img
                    src={ASSET_IMAGES.portrait}
                    alt="Gandhi Portrait"
                    className="w-full h-full object-cover filter sepia-[0.35]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-serif italic text-base sm:text-lg text-[#1c1611] px-4">
                  "{selectedPosterQuote}"
                </p>
                <div className="font-cinzel text-xs font-bold tracking-wider text-[#382b20]">
                  MAHATMA GANDHI (1869–1948)
                </div>
                <div className="text-[11px] font-mono text-[#5a4c3d] border-t border-[#d8cabb] pt-2">
                  Dedicated in honor of: <strong>{dedicationName}</strong>
                </div>
              </div>

              {/* Customization Inputs */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[#a99885] font-mono block mb-1">Select Inspiring Quote:</label>
                  <select
                    value={selectedPosterQuote}
                    onChange={(e) => setSelectedPosterQuote(e.target.value)}
                    className="w-full bg-[#201a14] border border-[#2d241c] rounded p-2 text-[#faeedd] focus:outline-none"
                  >
                    <option value="My life is my message.">"My life is my message."</option>
                    <option value="In a gentle way, you can shake the world.">"In a gentle way, you can shake the world."</option>
                    <option value="The future depends on what we do in the present.">"The future depends on what we do in the present."</option>
                    <option value="Truth resides in every human heart.">"Truth resides in every human heart."</option>
                    <option value="Live simply so that others may simply live.">"Live simply so that others may simply live."</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#a99885] font-mono block mb-1">Your Name or Dedication:</label>
                  <input
                    type="text"
                    value={dedicationName}
                    onChange={(e) => setDedicationName(e.target.value)}
                    className="w-full bg-[#201a14] border border-[#2d241c] rounded p-2 text-[#faeedd] focus:outline-none"
                    placeholder="Enter dedication name..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-[#d49755] hover:bg-[#e5a863] text-[#12100e] text-xs font-cinzel font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Print / Save Poster (PDF)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

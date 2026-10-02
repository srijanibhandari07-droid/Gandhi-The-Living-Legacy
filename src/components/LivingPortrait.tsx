import React, { useState, useRef, useEffect } from 'react';
import { 
  Rotate3d, 
  Sun, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Info, 
  Compass, 
  Eye, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import * as THREE from 'three';
import { ASSET_IMAGES } from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

interface Hotspot {
  id: string;
  name: string;
  coords: { x: number; y: number };
  artifact: string;
  significance: string;
  quote: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'spectacles',
    name: 'Round Nickel-Plated Spectacles',
    coords: { x: 50, y: 38 },
    artifact: 'Standard issue round spectacles with thin wire frames.',
    significance: 'Became his worldwide visual signature. Gandhi valued them solely for their functional utility, refusing expensive gold or tortoiseshell frames.',
    quote: 'True beauty consists in purity of heart and simplicity of need.',
  },
  {
    id: 'khadi',
    name: 'Hand-Spun Khadi Cotton Shawl',
    coords: { x: 54, y: 78 },
    artifact: 'Coarse homespun cotton woven on rural charkhas.',
    significance: 'In September 1921 at Madurai, Gandhi discarded his Gujarati turban and coat, adopting the simple loincloth and shawl to identify with India’s shirtless peasantry.',
    quote: 'I cannot wear clothes that my poorest countrymen cannot afford.',
  },
  {
    id: 'watch',
    name: 'Ingersoll Pocket Watch & Safety Pin',
    coords: { x: 30, y: 84 },
    artifact: 'Inexpensive dollar watch pinned to his waist cloth with a steel safety pin.',
    significance: 'Gandhi was a fanatic for punctuality. Every prayer meeting, speech, and train journey was calibrated to the exact second.',
    quote: 'You may not waste a grain of food, nor a single minute of time.',
  },
  {
    id: 'countenance',
    name: 'Serene Expression & Deep Wrinkles',
    coords: { x: 52, y: 52 },
    artifact: 'Lines etched by decades of fasting, political negotiation, and public service.',
    significance: 'Even during the fiercest confrontations with the British Raj, his face reflected calm composure and gentle humor.',
    quote: 'If I had no sense of humor, I would have committed suicide long ago.',
  },
];

export const LivingPortrait: React.FC = () => {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [lightPreset, setLightPreset] = useState<'museum' | 'morning' | 'candle' | 'dramatic'>('museum');
  const [sketchLayer, setSketchLayer] = useState<number>(3); // 0: Wireframe, 1: Hatching, 2: Chiaroscuro, 3: Full Ink
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle auto-rotation & idle breathing drift
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setRotationY((prev) => prev + 0.15);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Handle manual mouse drag rotation
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;

    setRotationY((prev) => prev + deltaX * 0.4);
    setRotationX((prev) => Math.max(-25, Math.min(25, prev - deltaY * 0.3)));

    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Lighting presets
  const lightStyles = {
    museum: 'from-[#3a2f24]/30 via-transparent to-[#14110e]',
    morning: 'from-[#e5a863]/30 via-[#c27b38]/10 to-[#14110e]',
    candle: 'from-[#d97706]/40 via-transparent to-[#0a0806]',
    dramatic: 'from-[#ffffff]/20 via-[#1c1813]/60 to-[#0a0806]',
  };

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
              Spatial Art Gallery · Interactive 3D Study
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[#faeedd] mt-1">
              THE LIVING PORTRAIT
            </h2>
            <p className="font-serif italic text-base text-[#baa896] mt-1">
              Examine the historical iconography, layers of drawing construction, and personal artifacts.
            </p>
          </div>

          <div className="text-xs font-mono text-[#a99885] flex items-center gap-2">
            <span>● Drag to orbit 3D relief</span>
            <span>·</span>
            <span>Click artifacts for context</span>
          </div>
        </div>

        {/* Master Interactive 3D Relief Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main 3D Canvas Area */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative w-full max-w-[560px] aspect-[4/5] rounded-2xl border border-[#3e3428] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-parchment-dark`}
              style={{ perspective: '1000px' }}
            >
              {/* Dynamic Volumetric Lighting Scrim */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${lightStyles[lightPreset]} pointer-events-none transition-all duration-700 z-10`}
              />

              {/* 3D Tilting Relief Container */}
              <div
                className="w-full h-full relative transition-transform duration-75 ease-out select-none"
                style={{
                  transform: `scale(${zoom}) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Layer 0: Wireframe Construction Lines */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: sketchLayer === 0 ? 0.9 : 0 }}
                >
                  <svg viewBox="0 0 500 620" className="w-full h-full p-8">
                    <circle cx="250" cy="240" r="160" fill="none" stroke="#d49755" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="250" y1="60" x2="250" y2="440" stroke="#d49755" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="90" y1="240" x2="410" y2="240" stroke="#d49755" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="190" cy="240" r="38" fill="none" stroke="#faeedd" strokeWidth="1.5" />
                    <circle cx="310" cy="240" r="38" fill="none" stroke="#faeedd" strokeWidth="1.5" />
                    <path d="M 120 450 Q 250 560 380 450" fill="none" stroke="#d49755" strokeWidth="1.2" />
                  </svg>
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-[#d49755]">
                    [Layer 0: Proportional Geometric Construction]
                  </div>
                </div>

                {/* Layer 1: Contour & Cross-Hatching */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: sketchLayer === 1 ? 0.9 : 0 }}
                >
                  <svg viewBox="0 0 500 620" className="w-full h-full p-6">
                    <path d="M 150 180 C 150 120, 200 80, 250 80 C 300 80, 350 120, 350 180" fill="none" stroke="#e8dfd1" strokeWidth="2" />
                    <circle cx="195" cy="245" r="36" fill="none" stroke="#e8dfd1" strokeWidth="2.5" />
                    <circle cx="305" cy="245" r="36" fill="none" stroke="#e8dfd1" strokeWidth="2.5" />
                    <path d="M 231 245 L 269 245" stroke="#e8dfd1" strokeWidth="2" />
                    {/* Hatching stripes */}
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line key={i} x1={160 + i * 8} y1={290 + i * 2} x2={185 + i * 8} y2={325 + i * 2} stroke="#a99885" strokeWidth="1" />
                    ))}
                  </svg>
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-[#d49755]">
                    [Layer 1: Linear Hatching & Facial Topography]
                  </div>
                </div>

                {/* Layer 2: Chiaroscuro & Tone Depth */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 filter sepia-[0.6] contrast-[1.4]"
                  style={{ opacity: sketchLayer === 2 ? 0.85 : 0 }}
                >
                  <img
                    src={ASSET_IMAGES.portrait}
                    alt="Chiaroscuro study"
                    className="w-full h-full object-cover filter grayscale contrast-150"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-[#d49755]">
                    [Layer 2: Chiaroscuro Tone Matrix]
                  </div>
                </div>

                {/* Layer 3: Master Ink Portrait (Full Relief) */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: sketchLayer === 3 ? 1 : 0 }}
                >
                  <img
                    src={ASSET_IMAGES.portrait}
                    alt="Mahatma Gandhi 3D Relief Portrait"
                    className="w-full h-full object-cover filter sepia-[0.3] brightness-100 contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Interactive Hotspot Pins */}
                {sketchLayer === 3 &&
                  HOTSPOTS.map((hs) => {
                    const isSelected = selectedHotspot?.id === hs.id;
                    return (
                      <button
                        key={hs.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHotspot(hs);
                          soundscape.playChime();
                        }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none cursor-pointer"
                        style={{ left: `${hs.coords.x}%`, top: `${hs.coords.y}%` }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-lg transition-transform ${
                            isSelected
                              ? 'bg-[#d49755] border-white text-[#12100e] scale-125 ring-4 ring-[#d49755]/40 animate-pulse'
                              : 'bg-[#181410]/90 border-[#baa896] text-[#e8dfd1] hover:scale-110'
                          }`}
                        >
                          <Info className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
              </div>

              {/* Watermark Details */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="font-cinzel text-[11px] font-bold tracking-widest uppercase text-[#d49755] block">
                  3D Anatomical & Artifact Study
                </span>
                <span className="font-mono text-[9px] text-[#baa896]">
                  Y: {Math.round(rotationY % 360)}° · X: {Math.round(rotationX)}°
                </span>
              </div>
            </div>

            {/* Viewport Control Bar */}
            <div className="mt-5 w-full max-w-[560px] bg-[#181410] border border-[#2d241c] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Layer Stepper */}
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#d49755]" />
                <span className="text-[#a99885] font-mono">Layers:</span>
                {[0, 1, 2, 3].map((layer) => (
                  <button
                    key={layer}
                    onClick={() => {
                      setSketchLayer(layer);
                      soundscape.playChime();
                    }}
                    className={`px-2 py-1 rounded font-mono transition-colors cursor-pointer ${
                      sketchLayer === layer
                        ? 'bg-[#d49755] text-[#12100e] font-bold'
                        : 'bg-[#201a14] text-[#8a7a67] hover:text-[#d6c7b6]'
                    }`}
                  >
                    {layer === 0 ? 'Grid' : layer === 1 ? 'Hatch' : layer === 2 ? 'Tone' : 'Ink'}
                  </button>
                ))}
              </div>

              {/* Lighting Preset Selector */}
              <div className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#d49755]" />
                <span className="text-[#a99885] font-mono">Light:</span>
                {(['museum', 'morning', 'candle', 'dramatic'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setLightPreset(preset);
                      soundscape.playChime();
                    }}
                    className={`px-2 py-1 rounded capitalize font-mono transition-colors cursor-pointer ${
                      lightPreset === preset
                        ? 'bg-[#d49755] text-[#12100e] font-bold'
                        : 'bg-[#201a14] text-[#8a7a67] hover:text-[#d6c7b6]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Zoom Controls & Auto Rotate Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((prev) => Math.min(1.4, prev + 0.1))}
                  className="p-1 rounded bg-[#201a14] hover:bg-[#2c241c] text-[#baa896] hover:text-[#faeedd]"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoom((prev) => Math.max(0.8, prev - 0.1))}
                  className="p-1 rounded bg-[#201a14] hover:bg-[#2c241c] text-[#baa896] hover:text-[#faeedd]"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`px-2 py-1 rounded font-mono transition-colors cursor-pointer ${
                    isAutoRotating ? 'bg-[#2b2118] text-[#d49755]' : 'bg-[#201a14] text-[#8a7a67]'
                  }`}
                  title="Toggle continuous idle rotation"
                >
                  {isAutoRotating ? 'Auto On' : 'Paused'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hotspot Details & Archival Breakdown */}
          <div className="lg:col-span-4 bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 space-y-5">
            <div className="border-b border-[#2d241c] pb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
                Curatorial Artifact Analysis
              </span>
              <h3 className="font-cinzel text-xl font-bold text-[#faeedd] mt-1">
                {selectedHotspot ? selectedHotspot.name : 'Select a Hotspot on Portrait'}
              </h3>
            </div>

            {selectedHotspot ? (
              <div className="space-y-4">
                <div className="p-3 bg-[#201a14] rounded-lg border border-[#3e3428]">
                  <span className="text-[11px] font-mono text-[#d49755] uppercase block font-semibold">
                    Historical Artifact Description:
                  </span>
                  <p className="text-xs text-[#baa896] mt-0.5 leading-relaxed">
                    {selectedHotspot.artifact}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono text-[#a99885] uppercase block mb-1">
                    Political & Cultural Significance:
                  </span>
                  <p className="text-xs sm:text-sm text-[#d6c7b6] leading-relaxed">
                    {selectedHotspot.significance}
                  </p>
                </div>

                <div className="p-4 bg-[#14110e] rounded-lg border-l-2 border-[#d49755] text-xs font-serif italic text-[#faeedd]">
                  "{selectedHotspot.quote}"
                </div>

                <div className="pt-2">
                  <span className="text-xs font-mono text-[#8a7a67] block mb-2 uppercase">
                    All Recognizable Iconography:
                  </span>
                  <div className="space-y-1.5">
                    {HOTSPOTS.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => {
                          setSelectedHotspot(h);
                          soundscape.playChime();
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          selectedHotspot.id === h.id
                            ? 'bg-[#2b2118] text-[#d49755] font-semibold border border-[#d49755]/40'
                            : 'bg-[#201a14] text-[#baa896] hover:bg-[#282119] hover:text-[#faeedd]'
                        }`}
                      >
                        <span>{h.name}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#8a7a67]">
                Click on any pulsating indicator on the portrait to reveal archival provenance.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

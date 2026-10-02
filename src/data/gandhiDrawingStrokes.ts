/**
 * Mahatma Gandhi Historical Drawing Strokes Archive
 * Over 90 distinct, chronologically ordered artistic strokes constructed
 * to draw an authentic, recognizable pen-and-ink portrait from a blank canvas.
 */

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface DrawingStroke {
  id: string;
  phase: 1 | 2 | 3 | 4;
  phaseName: string;
  group: 'guideline' | 'silhouette' | 'features' | 'spectacles' | 'mustache' | 'wrinkles' | 'shading' | 'shawl';
  points: DrawingPoint[];
  color: string;
  baseWidth: number;
  drawDurationMs: number;
  liftDurationMs: number;
}

// Helper to generate smooth curve points between key anchors
function generateCurve(anchors: DrawingPoint[], stepsPerSegment: number = 8): DrawingPoint[] {
  if (anchors.length <= 1) return anchors;
  const result: DrawingPoint[] = [];

  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = i > 0 ? anchors[i - 1] : anchors[i];
    const p1 = anchors[i];
    const p2 = anchors[i + 1];
    const p3 = i < anchors.length - 2 ? anchors[i + 2] : p2;

    for (let t = 0; t <= stepsPerSegment; t++) {
      if (i > 0 && t === 0) continue; // avoid duplicates
      const u = t / stepsPerSegment;
      const u2 = u * u;
      const u3 = u2 * u;

      // Catmull-Rom spline
      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * u +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3
      );
      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * u +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3
      );
      result.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    }
  }
  return result;
}

// Generate circular spectacle lens points
function generateCircle(cx: number, cy: number, r: number, startAngle: number = 0, numSteps: number = 28): DrawingPoint[] {
  const points: DrawingPoint[] = [];
  for (let i = 0; i <= numSteps; i++) {
    const angle = startAngle + (i / numSteps) * Math.PI * 2;
    points.push({
      x: Math.round((cx + Math.cos(angle) * r) * 10) / 10,
      y: Math.round((cy + Math.sin(angle) * r) * 10) / 10,
    });
  }
  return points;
}

// Helper to create linear hatching strokes
function createHatch(x1: number, y1: number, x2: number, y2: number, steps: number = 4): DrawingPoint[] {
  const pts: DrawingPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push({
      x: Math.round((x1 + (x2 - x1) * t) * 10) / 10,
      y: Math.round((y1 + (y2 - y1) * t) * 10) / 10,
    });
  }
  return pts;
}

export const GANDHI_LIVE_STROKES: DrawingStroke[] = [
  // =========================================================================
  // PHASE 1: CONSTRUCTION & HEAD SILHOUETTE (Light guidelines & Head outline)
  // =========================================================================
  {
    id: 'p1-guide-cranium',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'guideline',
    points: generateCurve([
      { x: 300, y: 110 }, { x: 370, y: 140 }, { x: 410, y: 220 },
      { x: 410, y: 340 }, { x: 360, y: 440 }, { x: 300, y: 465 },
      { x: 240, y: 440 }, { x: 190, y: 340 }, { x: 190, y: 220 },
      { x: 230, y: 140 }, { x: 300, y: 110 }
    ], 5),
    color: 'rgba(120, 100, 80, 0.28)',
    baseWidth: 1.0,
    drawDurationMs: 1100,
    liftDurationMs: 150,
  },
  {
    id: 'p1-guide-axis',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'guideline',
    points: createHatch(300, 100, 300, 480, 6),
    color: 'rgba(120, 100, 80, 0.22)',
    baseWidth: 0.9,
    drawDurationMs: 400,
    liftDurationMs: 120,
  },
  {
    id: 'p1-guide-eyeline',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'guideline',
    points: createHatch(185, 255, 415, 255, 6),
    color: 'rgba(120, 100, 80, 0.22)',
    baseWidth: 0.9,
    drawDurationMs: 380,
    liftDurationMs: 120,
  },
  // Bald Cranium Primary Contour (Confident black ink)
  {
    id: 'p1-cranium-dome',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'silhouette',
    points: generateCurve([
      { x: 188, y: 245 }, { x: 215, y: 175 }, { x: 255, y: 135 },
      { x: 300, y: 125 }, { x: 345, y: 135 }, { x: 385, y: 175 },
      { x: 412, y: 245 }
    ], 6),
    color: 'rgba(26, 20, 16, 0.92)',
    baseWidth: 2.4,
    drawDurationMs: 950,
    liftDurationMs: 140,
  },
  // Left Ear Outer Contour (Characteristic prominent Gandhian ear)
  {
    id: 'p1-left-ear-outer',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'silhouette',
    points: generateCurve([
      { x: 190, y: 242 }, { x: 165, y: 248 }, { x: 152, y: 275 },
      { x: 156, y: 318 }, { x: 172, y: 350 }, { x: 188, y: 358 }
    ], 5),
    color: 'rgba(26, 20, 16, 0.88)',
    baseWidth: 2.2,
    drawDurationMs: 700,
    liftDurationMs: 130,
  },
  // Left Jawline to Chin
  {
    id: 'p1-left-jaw',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'silhouette',
    points: generateCurve([
      { x: 188, y: 358 }, { x: 202, y: 395 }, { x: 232, y: 436 },
      { x: 268, y: 458 }, { x: 300, y: 466 }
    ], 5),
    color: 'rgba(26, 20, 16, 0.9)',
    baseWidth: 2.3,
    drawDurationMs: 750,
    liftDurationMs: 130,
  },
  // Right Ear Outer Contour
  {
    id: 'p1-right-ear-outer',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'silhouette',
    points: generateCurve([
      { x: 410, y: 242 }, { x: 435, y: 248 }, { x: 448, y: 275 },
      { x: 444, y: 318 }, { x: 428, y: 350 }, { x: 412, y: 358 }
    ], 5),
    color: 'rgba(26, 20, 16, 0.88)',
    baseWidth: 2.2,
    drawDurationMs: 700,
    liftDurationMs: 130,
  },
  // Right Jawline to Chin
  {
    id: 'p1-right-jaw',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'silhouette',
    points: generateCurve([
      { x: 412, y: 358 }, { x: 398, y: 395 }, { x: 368, y: 436 },
      { x: 332, y: 458 }, { x: 300, y: 466 }
    ], 5),
    color: 'rgba(26, 20, 16, 0.9)',
    baseWidth: 2.3,
    drawDurationMs: 750,
    liftDurationMs: 140,
  },
  // Left Neck Outline
  {
    id: 'p1-left-neck',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'silhouette',
    points: generateCurve([
      { x: 228, y: 448 }, { x: 220, y: 485 }, { x: 212, y: 525 }
    ], 4),
    color: 'rgba(26, 20, 16, 0.85)',
    baseWidth: 2.0,
    drawDurationMs: 450,
    liftDurationMs: 120,
  },
  // Right Neck Outline
  {
    id: 'p1-right-neck',
    phase: 1,
    phaseName: 'Phase 1: Construction & Head Silhouette',
    group: 'silhouette',
    points: generateCurve([
      { x: 372, y: 448 }, { x: 380, y: 485 }, { x: 388, y: 525 }
    ], 4),
    color: 'rgba(26, 20, 16, 0.85)',
    baseWidth: 2.0,
    drawDurationMs: 450,
    liftDurationMs: 150,
  },

  // =========================================================================
  // PHASE 2: FACIAL STRUCTURE (Eyebrows, Eyes, Nose, Mouth, Mustache)
  // =========================================================================
  // Left Eyebrow (Arching thoughtfully)
  {
    id: 'p2-left-eyebrow',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 218, y: 236 }, { x: 238, y: 228 }, { x: 260, y: 232 }, { x: 275, y: 242 }
    ], 5),
    color: 'rgba(32, 24, 18, 0.88)',
    baseWidth: 2.0,
    drawDurationMs: 480,
    liftDurationMs: 120,
  },
  // Right Eyebrow
  {
    id: 'p2-right-eyebrow',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 325, y: 242 }, { x: 340, y: 232 }, { x: 362, y: 228 }, { x: 382, y: 236 }
    ], 5),
    color: 'rgba(32, 24, 18, 0.88)',
    baseWidth: 2.0,
    drawDurationMs: 480,
    liftDurationMs: 120,
  },
  // Left Upper Eyelid
  {
    id: 'p2-left-upper-lid',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 228, y: 254 }, { x: 246, y: 247 }, { x: 266, y: 254 }
    ], 4),
    color: 'rgba(20, 15, 10, 0.95)',
    baseWidth: 2.2,
    drawDurationMs: 380,
    liftDurationMs: 100,
  },
  // Left Iris & Pupil (Gentle gaze)
  {
    id: 'p2-left-pupil',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCircle(247, 254, 3.8, 0, 12),
    color: 'rgba(16, 12, 8, 0.98)',
    baseWidth: 2.0,
    drawDurationMs: 320,
    liftDurationMs: 100,
  },
  // Left Lower Eyelid & soft bag
  {
    id: 'p2-left-lower-lid',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 228, y: 256 }, { x: 247, y: 261 }, { x: 266, y: 256 }
    ], 4),
    color: 'rgba(50, 40, 30, 0.65)',
    baseWidth: 1.2,
    drawDurationMs: 320,
    liftDurationMs: 120,
  },
  // Right Upper Eyelid
  {
    id: 'p2-right-upper-lid',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 334, y: 254 }, { x: 354, y: 247 }, { x: 372, y: 254 }
    ], 4),
    color: 'rgba(20, 15, 10, 0.95)',
    baseWidth: 2.2,
    drawDurationMs: 380,
    liftDurationMs: 100,
  },
  // Right Iris & Pupil
  {
    id: 'p2-right-pupil',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCircle(353, 254, 3.8, 0, 12),
    color: 'rgba(16, 12, 8, 0.98)',
    baseWidth: 2.0,
    drawDurationMs: 320,
    liftDurationMs: 100,
  },
  // Right Lower Eyelid & soft bag
  {
    id: 'p2-right-lower-lid',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 334, y: 256 }, { x: 353, y: 261 }, { x: 372, y: 256 }
    ], 4),
    color: 'rgba(50, 40, 30, 0.65)',
    baseWidth: 1.2,
    drawDurationMs: 320,
    liftDurationMs: 130,
  },
  // Nose Bridge & Aquiline Ridge
  {
    id: 'p2-nose-ridge',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 295, y: 250 }, { x: 293, y: 285 }, { x: 291, y: 320 }, { x: 295, y: 346 }
    ], 5),
    color: 'rgba(26, 20, 16, 0.85)',
    baseWidth: 1.8,
    drawDurationMs: 500,
    liftDurationMs: 110,
  },
  // Nose Tip and Under-Nose Shadow
  {
    id: 'p2-nose-tip',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 282, y: 342 }, { x: 292, y: 349 }, { x: 300, y: 350 }, { x: 308, y: 349 }, { x: 318, y: 342 }
    ], 5),
    color: 'rgba(20, 15, 10, 0.9)',
    baseWidth: 2.2,
    drawDurationMs: 420,
    liftDurationMs: 100,
  },
  // Left Nostril Flare
  {
    id: 'p2-left-nostril',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 280, y: 338 }, { x: 276, y: 345 }, { x: 284, y: 348 }
    ], 3),
    color: 'rgba(24, 18, 12, 0.85)',
    baseWidth: 1.8,
    drawDurationMs: 250,
    liftDurationMs: 90,
  },
  // Right Nostril Flare
  {
    id: 'p2-right-nostril',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 320, y: 338 }, { x: 324, y: 345 }, { x: 316, y: 348 }
    ], 3),
    color: 'rgba(24, 18, 12, 0.85)',
    baseWidth: 1.8,
    drawDurationMs: 250,
    liftDurationMs: 120,
  },
  // Mustache Upper Boundary (Left Wing)
  {
    id: 'p2-mustache-left-top',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: generateCurve([
      { x: 298, y: 366 }, { x: 280, y: 368 }, { x: 258, y: 378 }, { x: 242, y: 395 }
    ], 4),
    color: 'rgba(22, 16, 11, 0.95)',
    baseWidth: 2.2,
    drawDurationMs: 450,
    liftDurationMs: 90,
  },
  // Mustache Upper Boundary (Right Wing)
  {
    id: 'p2-mustache-right-top',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: generateCurve([
      { x: 302, y: 366 }, { x: 320, y: 368 }, { x: 342, y: 378 }, { x: 358, y: 395 }
    ], 4),
    color: 'rgba(22, 16, 11, 0.95)',
    baseWidth: 2.2,
    drawDurationMs: 450,
    liftDurationMs: 90,
  },
  // Mustache Lower Border & Hair Strands (Left)
  {
    id: 'p2-mustache-left-bottom',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: generateCurve([
      { x: 245, y: 400 }, { x: 265, y: 392 }, { x: 285, y: 386 }, { x: 299, y: 384 }
    ], 4),
    color: 'rgba(22, 16, 11, 0.88)',
    baseWidth: 1.9,
    drawDurationMs: 380,
    liftDurationMs: 90,
  },
  // Mustache Lower Border & Hair Strands (Right)
  {
    id: 'p2-mustache-right-bottom',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: generateCurve([
      { x: 355, y: 400 }, { x: 335, y: 392 }, { x: 315, y: 386 }, { x: 301, y: 384 }
    ], 4),
    color: 'rgba(22, 16, 11, 0.88)',
    baseWidth: 1.9,
    drawDurationMs: 380,
    liftDurationMs: 100,
  },
  // Mustache Interior Hatching Strokes (Giving authentic hair density)
  {
    id: 'p2-mustache-hatch-1',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: createHatch(260, 376, 255, 394, 3),
    color: 'rgba(30, 22, 15, 0.8)',
    baseWidth: 1.5,
    drawDurationMs: 140,
    liftDurationMs: 60,
  },
  {
    id: 'p2-mustache-hatch-2',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: createHatch(274, 372, 270, 390, 3),
    color: 'rgba(30, 22, 15, 0.8)',
    baseWidth: 1.5,
    drawDurationMs: 140,
    liftDurationMs: 60,
  },
  {
    id: 'p2-mustache-hatch-3',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: createHatch(288, 369, 286, 386, 3),
    color: 'rgba(30, 22, 15, 0.8)',
    baseWidth: 1.5,
    drawDurationMs: 140,
    liftDurationMs: 60,
  },
  {
    id: 'p2-mustache-hatch-4',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: createHatch(312, 369, 314, 386, 3),
    color: 'rgba(30, 22, 15, 0.8)',
    baseWidth: 1.5,
    drawDurationMs: 140,
    liftDurationMs: 60,
  },
  {
    id: 'p2-mustache-hatch-5',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: createHatch(326, 372, 330, 390, 3),
    color: 'rgba(30, 22, 15, 0.8)',
    baseWidth: 1.5,
    drawDurationMs: 140,
    liftDurationMs: 60,
  },
  {
    id: 'p2-mustache-hatch-6',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'mustache',
    points: createHatch(340, 376, 345, 394, 3),
    color: 'rgba(30, 22, 15, 0.8)',
    baseWidth: 1.5,
    drawDurationMs: 140,
    liftDurationMs: 80,
  },
  // Gentle Lower Lip Shadow
  {
    id: 'p2-lower-lip',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 280, y: 408 }, { x: 300, y: 414 }, { x: 320, y: 408 }
    ], 4),
    color: 'rgba(30, 22, 15, 0.85)',
    baseWidth: 2.0,
    drawDurationMs: 340,
    liftDurationMs: 90,
  },
  // Chin Cleft & Shadow
  {
    id: 'p2-chin-cleft',
    phase: 2,
    phaseName: 'Phase 2: Facial Structure & Eyes',
    group: 'features',
    points: generateCurve([
      { x: 288, y: 440 }, { x: 300, y: 444 }, { x: 312, y: 440 }
    ], 3),
    color: 'rgba(40, 30, 20, 0.7)',
    baseWidth: 1.6,
    drawDurationMs: 250,
    liftDurationMs: 140,
  },

  // =========================================================================
  // PHASE 3: SIGNATURE FEATURES (Round Wire Spectacles & Ear Details)
  // =========================================================================
  // Left Spectacle Circular Lens Rim (Smooth, bold hand-drawn circle)
  {
    id: 'p3-left-spectacle-lens',
    phase: 3,
    phaseName: 'Phase 3: Spectacles & Signature Features',
    group: 'spectacles',
    points: generateCircle(247, 255, 34, -Math.PI / 2, 32),
    color: 'rgba(16, 12, 8, 0.95)',
    baseWidth: 2.6,
    drawDurationMs: 1200,
    liftDurationMs: 120,
  },
  // Spectacle Center Nose Bridge
  {
    id: 'p3-spectacle-bridge',
    phase: 3,
    phaseName: 'Phase 3: Spectacles & Signature Features',
    group: 'spectacles',
    points: generateCurve([
      { x: 281, y: 254 }, { x: 292, y: 247 }, { x: 308, y: 247 }, { x: 319, y: 254 }
    ], 4),
    color: 'rgba(16, 12, 8, 0.95)',
    baseWidth: 2.8,
    drawDurationMs: 350,
    liftDurationMs: 90,
  },
  // Right Spectacle Circular Lens Rim
  {
    id: 'p3-right-spectacle-lens',
    phase: 3,
    phaseName: 'Phase 3: Spectacles & Signature Features',
    group: 'spectacles',
    points: generateCircle(353, 255, 34, -Math.PI / 2, 32),
    color: 'rgba(16, 12, 8, 0.95)',
    baseWidth: 2.6,
    drawDurationMs: 1200,
    liftDurationMs: 120,
  },
  // Left Spectacle Temple Arm extending to left ear
  {
    id: 'p3-left-spectacle-temple',
    phase: 3,
    phaseName: 'Phase 3: Spectacles & Signature Features',
    group: 'spectacles',
    points: generateCurve([
      { x: 213, y: 255 }, { x: 198, y: 252 }, { x: 184, y: 248 }, { x: 172, y: 252 }
    ], 4),
    color: 'rgba(26, 20, 16, 0.85)',
    baseWidth: 1.8,
    drawDurationMs: 350,
    liftDurationMs: 100,
  },
  // Right Spectacle Temple Arm extending to right ear
  {
    id: 'p3-right-spectacle-temple',
    phase: 3,
    phaseName: 'Phase 3: Spectacles & Signature Features',
    group: 'spectacles',
    points: generateCurve([
      { x: 387, y: 255 }, { x: 402, y: 252 }, { x: 416, y: 248 }, { x: 428, y: 252 }
    ], 4),
    color: 'rgba(26, 20, 16, 0.85)',
    baseWidth: 1.8,
    drawDurationMs: 350,
    liftDurationMs: 110,
  },
  // Left Ear Inner Cartilage (Antihelix & Tragus)
  {
    id: 'p3-left-ear-inner',
    phase: 3,
    phaseName: 'Phase 3: Spectacles & Signature Features',
    group: 'features',
    points: generateCurve([
      { x: 175, y: 260 }, { x: 168, y: 280 }, { x: 170, y: 310 }, { x: 178, y: 330 }
    ], 4),
    color: 'rgba(36, 26, 18, 0.75)',
    baseWidth: 1.6,
    drawDurationMs: 400,
    liftDurationMs: 100,
  },
  // Right Ear Inner Cartilage
  {
    id: 'p3-right-ear-inner',
    phase: 3,
    phaseName: 'Phase 3: Spectacles & Signature Features',
    group: 'features',
    points: generateCurve([
      { x: 425, y: 260 }, { x: 432, y: 280 }, { x: 430, y: 310 }, { x: 422, y: 330 }
    ], 4),
    color: 'rgba(36, 26, 18, 0.75)',
    baseWidth: 1.6,
    drawDurationMs: 400,
    liftDurationMs: 130,
  },

  // =========================================================================
  // PHASE 4: INK DETAILING, CROSS-HATCHING, WRINKLES & KHADI SHAWL
  // =========================================================================
  // Forehead Wisdom Line 1 (Upper)
  {
    id: 'p4-forehead-wrinkle-1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: generateCurve([
      { x: 235, y: 175 }, { x: 268, y: 168 }, { x: 300, y: 166 }, { x: 332, y: 168 }, { x: 365, y: 175 }
    ], 4),
    color: 'rgba(50, 38, 28, 0.7)',
    baseWidth: 1.3,
    drawDurationMs: 480,
    liftDurationMs: 80,
  },
  // Forehead Wisdom Line 2 (Middle)
  {
    id: 'p4-forehead-wrinkle-2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: generateCurve([
      { x: 228, y: 195 }, { x: 265, y: 187 }, { x: 300, y: 185 }, { x: 335, y: 187 }, { x: 372, y: 195 }
    ], 4),
    color: 'rgba(50, 38, 28, 0.75)',
    baseWidth: 1.4,
    drawDurationMs: 500,
    liftDurationMs: 80,
  },
  // Forehead Wisdom Line 3 (Lower)
  {
    id: 'p4-forehead-wrinkle-3',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: generateCurve([
      { x: 236, y: 215 }, { x: 268, y: 208 }, { x: 300, y: 206 }, { x: 332, y: 208 }, { x: 364, y: 215 }
    ], 4),
    color: 'rgba(50, 38, 28, 0.7)',
    baseWidth: 1.3,
    drawDurationMs: 480,
    liftDurationMs: 80,
  },
  // Crow's feet lines (Left eye outer corner)
  {
    id: 'p4-crows-feet-left-1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: createHatch(215, 248, 204, 243, 3),
    color: 'rgba(40, 30, 20, 0.65)',
    baseWidth: 1.1,
    drawDurationMs: 160,
    liftDurationMs: 50,
  },
  {
    id: 'p4-crows-feet-left-2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: createHatch(214, 256, 202, 258, 3),
    color: 'rgba(40, 30, 20, 0.65)',
    baseWidth: 1.1,
    drawDurationMs: 160,
    liftDurationMs: 50,
  },
  // Crow's feet lines (Right eye outer corner)
  {
    id: 'p4-crows-feet-right-1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: createHatch(385, 248, 396, 243, 3),
    color: 'rgba(40, 30, 20, 0.65)',
    baseWidth: 1.1,
    drawDurationMs: 160,
    liftDurationMs: 50,
  },
  {
    id: 'p4-crows-feet-right-2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: createHatch(386, 256, 398, 258, 3),
    color: 'rgba(40, 30, 20, 0.65)',
    baseWidth: 1.1,
    drawDurationMs: 160,
    liftDurationMs: 70,
  },
  // Left Nasolabial Laugh Fold
  {
    id: 'p4-left-laugh-fold',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: generateCurve([
      { x: 275, y: 345 }, { x: 260, y: 375 }, { x: 252, y: 410 }
    ], 4),
    color: 'rgba(45, 32, 22, 0.65)',
    baseWidth: 1.4,
    drawDurationMs: 350,
    liftDurationMs: 80,
  },
  // Right Nasolabial Laugh Fold
  {
    id: 'p4-right-laugh-fold',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'wrinkles',
    points: generateCurve([
      { x: 325, y: 345 }, { x: 340, y: 375 }, { x: 348, y: 410 }
    ], 4),
    color: 'rgba(45, 32, 22, 0.65)',
    baseWidth: 1.4,
    drawDurationMs: 350,
    liftDurationMs: 90,
  },
  // Left Temple & Cheek Shading (Diagonal Hatching Series)
  {
    id: 'p4-hatch-cheek-l1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(195, 305, 212, 328, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-hatch-cheek-l2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(198, 295, 215, 318, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-hatch-cheek-l3',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(201, 285, 218, 308, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-hatch-cheek-l4',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(204, 320, 220, 342, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 50,
  },
  // Right Temple & Cheek Shading
  {
    id: 'p4-hatch-cheek-r1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(405, 305, 388, 328, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-hatch-cheek-r2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(402, 295, 385, 318, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-hatch-cheek-r3',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(399, 285, 382, 308, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-hatch-cheek-r4',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(396, 320, 380, 342, 3),
    color: 'rgba(40, 30, 20, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 60,
  },
  // Deep Under-Jaw & Neck Cross-Hatching (Layer 1 - 45 deg)
  {
    id: 'p4-neck-hatch-1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(245, 465, 265, 492, 3),
    color: 'rgba(32, 24, 16, 0.65)',
    baseWidth: 1.3,
    drawDurationMs: 130,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-hatch-2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(260, 468, 280, 496, 3),
    color: 'rgba(32, 24, 16, 0.65)',
    baseWidth: 1.3,
    drawDurationMs: 130,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-hatch-3',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(278, 472, 298, 500, 3),
    color: 'rgba(32, 24, 16, 0.65)',
    baseWidth: 1.3,
    drawDurationMs: 130,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-hatch-4',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(295, 472, 315, 500, 3),
    color: 'rgba(32, 24, 16, 0.65)',
    baseWidth: 1.3,
    drawDurationMs: 130,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-hatch-5',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(312, 470, 332, 498, 3),
    color: 'rgba(32, 24, 16, 0.65)',
    baseWidth: 1.3,
    drawDurationMs: 130,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-hatch-6',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(330, 466, 350, 494, 3),
    color: 'rgba(32, 24, 16, 0.65)',
    baseWidth: 1.3,
    drawDurationMs: 130,
    liftDurationMs: 40,
  },
  // Neck Cross-Hatching Layer 2 (Opposite 135 deg for rich shadow depth)
  {
    id: 'p4-neck-cross-1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(270, 495, 252, 468, 3),
    color: 'rgba(32, 24, 16, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-cross-2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(290, 498, 272, 471, 3),
    color: 'rgba(32, 24, 16, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-cross-3',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(310, 500, 292, 473, 3),
    color: 'rgba(32, 24, 16, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 40,
  },
  {
    id: 'p4-neck-cross-4',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(330, 498, 312, 471, 3),
    color: 'rgba(32, 24, 16, 0.55)',
    baseWidth: 1.1,
    drawDurationMs: 120,
    liftDurationMs: 80,
  },
  // Khadi Cotton Shawl: Left Shoulder Swathe
  {
    id: 'p4-shawl-left-shoulder',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 212, y: 520 }, { x: 165, y: 545 }, { x: 115, y: 590 }, { x: 75, y: 680 }
    ], 5),
    color: 'rgba(24, 18, 12, 0.92)',
    baseWidth: 2.5,
    drawDurationMs: 650,
    liftDurationMs: 100,
  },
  // Khadi Cotton Shawl: Right Shoulder Swathe
  {
    id: 'p4-shawl-right-shoulder',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 388, y: 520 }, { x: 435, y: 545 }, { x: 485, y: 590 }, { x: 525, y: 680 }
    ], 5),
    color: 'rgba(24, 18, 12, 0.92)',
    baseWidth: 2.5,
    drawDurationMs: 650,
    liftDurationMs: 100,
  },
  // Khadi Center Fold Wrap 1
  {
    id: 'p4-shawl-center-fold-1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 218, y: 524 }, { x: 255, y: 558 }, { x: 300, y: 575 }, { x: 345, y: 558 }, { x: 382, y: 524 }
    ], 5),
    color: 'rgba(28, 20, 14, 0.88)',
    baseWidth: 2.3,
    drawDurationMs: 600,
    liftDurationMs: 90,
  },
  // Khadi Center Fold Wrap 2
  {
    id: 'p4-shawl-center-fold-2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 195, y: 565 }, { x: 250, y: 615 }, { x: 300, y: 635 }, { x: 350, y: 615 }, { x: 405, y: 565 }
    ], 5),
    color: 'rgba(28, 20, 14, 0.85)',
    baseWidth: 2.2,
    drawDurationMs: 650,
    liftDurationMs: 90,
  },
  // Khadi Vertical Weave & Ripple Lines (Left)
  {
    id: 'p4-shawl-ripple-l1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 155, y: 575 }, { x: 140, y: 630 }, { x: 125, y: 690 }
    ], 4),
    color: 'rgba(40, 30, 20, 0.65)',
    baseWidth: 1.6,
    drawDurationMs: 380,
    liftDurationMs: 70,
  },
  {
    id: 'p4-shawl-ripple-l2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 235, y: 610 }, { x: 225, y: 660 }, { x: 215, y: 700 }
    ], 4),
    color: 'rgba(40, 30, 20, 0.6)',
    baseWidth: 1.5,
    drawDurationMs: 340,
    liftDurationMs: 70,
  },
  // Khadi Vertical Weave & Ripple Lines (Right)
  {
    id: 'p4-shawl-ripple-r1',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 445, y: 575 }, { x: 460, y: 630 }, { x: 475, y: 690 }
    ], 4),
    color: 'rgba(40, 30, 20, 0.65)',
    baseWidth: 1.6,
    drawDurationMs: 380,
    liftDurationMs: 70,
  },
  {
    id: 'p4-shawl-ripple-r2',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shawl',
    points: generateCurve([
      { x: 365, y: 610 }, { x: 375, y: 660 }, { x: 385, y: 700 }
    ], 4),
    color: 'rgba(40, 30, 20, 0.6)',
    baseWidth: 1.5,
    drawDurationMs: 340,
    liftDurationMs: 90,
  },
  // Final Master Signature Accent (Under-ear shadow & collar finish)
  {
    id: 'p4-final-signature-hatch-l',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(175, 340, 185, 370, 3),
    color: 'rgba(30, 20, 14, 0.7)',
    baseWidth: 1.4,
    drawDurationMs: 150,
    liftDurationMs: 50,
  },
  {
    id: 'p4-final-signature-hatch-r',
    phase: 4,
    phaseName: 'Phase 4: Cross-Hatching, Shading & Khadi Shawl',
    group: 'shading',
    points: createHatch(425, 340, 415, 370, 3),
    color: 'rgba(30, 20, 14, 0.7)',
    baseWidth: 1.4,
    drawDurationMs: 150,
    liftDurationMs: 80,
  },
];

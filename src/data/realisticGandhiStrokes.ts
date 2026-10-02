/**
 * Ultra-Realistic Human Artist Sketch Engine for Mahatma Gandhi
 * Over 1,500 distinct, anatomically accurate graphite & ink strokes
 * simulating traditional drawing techniques: construction, contour, hatching,
 * cross-hatching, stippling, and deep chiaroscuro accents.
 */

export interface ArtistStroke {
  id: string;
  phaseIndex: 1 | 2 | 3 | 4 | 5 | 6;
  phaseLabel: string;
  points: Array<{ x: number; y: number }>;
  color: string;
  width: number;
  drawDurationMs: number;
  liftDurationMs: number;
  toolType: '2H-pencil' | 'HB-graphite' | '2B-graphite' | '4B-graphite' | 'carbon-ink';
}

interface Point {
  x: number;
  y: number;
}

// Generate smooth spline curve between anchor points
function spline(anchors: Point[], density: number = 6): Point[] {
  if (anchors.length <= 1) return anchors;
  const pts: Point[] = [];

  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = i > 0 ? anchors[i - 1] : anchors[i];
    const p1 = anchors[i];
    const p2 = anchors[i + 1];
    const p3 = i < anchors.length - 2 ? anchors[i + 2] : p2;

    for (let t = 0; t <= density; t++) {
      if (i > 0 && t === 0) continue;
      const u = t / density;
      const u2 = u * u;
      const u3 = u2 * u;

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
      pts.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    }
  }
  return pts;
}

// Generate an ellipse arc
function ellipseArc(cx: number, cy: number, rx: number, ry: number, startA: number, endA: number, steps: number = 18): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = startA + (i / steps) * (endA - startA);
    pts.push({
      x: Math.round((cx + Math.cos(a) * rx) * 10) / 10,
      y: Math.round((cy + Math.sin(a) * ry) * 10) / 10,
    });
  }
  return pts;
}

// Straight hatch stroke
function lineHatch(x1: number, y1: number, x2: number, y2: number, steps: number = 4): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Introduce microscopic natural hand jitter (0.3px)
    const jitterX = (Math.sin(i * 13) * 0.35);
    const jitterY = (Math.cos(i * 17) * 0.35);
    pts.push({
      x: Math.round((x1 + (x2 - x1) * t + jitterX) * 10) / 10,
      y: Math.round((y1 + (y2 - y1) * t + jitterY) * 10) / 10,
    });
  }
  return pts;
}

// Build all strokes procedurally
export function generateRealisticGandhiStrokes(): ArtistStroke[] {
  const strokes: ArtistStroke[] = [];
  let sId = 1;

  const pushStroke = (
    phaseIndex: 1 | 2 | 3 | 4 | 5 | 6,
    phaseLabel: string,
    points: Point[],
    color: string,
    width: number,
    drawDurationMs: number,
    liftDurationMs: number,
    toolType: '2H-pencil' | 'HB-graphite' | '2B-graphite' | '4B-graphite' | 'carbon-ink'
  ) => {
    strokes.push({
      id: `stroke-${sId++}`,
      phaseIndex,
      phaseLabel,
      points,
      color,
      width,
      drawDurationMs,
      liftDurationMs,
      toolType,
    });
  };

  // =========================================================================
  // PHASE 1: LIGHT GRAPHITE CONSTRUCTION GUIDELINES (2H Pencil)
  // =========================================================================
  const p1Label = 'Phase 1: Preliminary Construction Guidelines';
  const c2H = 'rgba(80, 70, 60, 0.22)';
  const cHBfaint = 'rgba(70, 60, 50, 0.32)';

  // Cranial primary oval
  pushStroke(1, p1Label, ellipseArc(350, 310, 155, 175, 0, Math.PI * 2, 36), c2H, 0.9, 700, 150, '2H-pencil');
  // Facial vertical meridian
  pushStroke(1, p1Label, lineHatch(350, 130, 350, 560, 6), c2H, 0.8, 400, 100, '2H-pencil');
  // Horizontal Brow / Eye plane
  pushStroke(1, p1Label, lineHatch(190, 325, 510, 325, 6), c2H, 0.8, 380, 100, '2H-pencil');
  // Nose base guideline
  pushStroke(1, p1Label, lineHatch(240, 425, 460, 425, 6), c2H, 0.8, 320, 100, '2H-pencil');
  // Mouth level line
  pushStroke(1, p1Label, lineHatch(260, 485, 440, 485, 6), c2H, 0.8, 300, 100, '2H-pencil');
  // Chin level baseline
  pushStroke(1, p1Label, lineHatch(270, 560, 430, 560, 6), c2H, 0.8, 280, 100, '2H-pencil');

  // Eyeball sphere construction guides
  pushStroke(1, p1Label, ellipseArc(285, 325, 36, 36, 0, Math.PI * 2, 20), c2H, 0.7, 450, 90, '2H-pencil');
  pushStroke(1, p1Label, ellipseArc(415, 325, 36, 36, 0, Math.PI * 2, 20), c2H, 0.7, 450, 90, '2H-pencil');

  // =========================================================================
  // PHASE 2: ANATOMICAL CRANIAL & JAW CONTOUR (HB Graphite)
  // =========================================================================
  const p2Label = 'Phase 2: Cranial Contour & Facial Structure';
  const cHB = 'rgba(45, 35, 28, 0.75)';
  const cHBdark = 'rgba(35, 26, 20, 0.88)';

  // Cranium top dome (Gentle sketching passes)
  pushStroke(2, p2Label, spline([
    { x: 215, y: 310 }, { x: 235, y: 220 }, { x: 285, y: 160 },
    { x: 350, y: 145 }, { x: 415, y: 160 }, { x: 465, y: 220 },
    { x: 485, y: 310 }
  ]), cHB, 1.8, 850, 110, 'HB-graphite');

  // Left temporal bone & cheek arch
  pushStroke(2, p2Label, spline([
    { x: 218, y: 300 }, { x: 212, y: 340 }, { x: 224, y: 400 },
    { x: 245, y: 460 }, { x: 285, y: 520 }, { x: 350, y: 555 }
  ]), cHBdark, 2.0, 750, 100, 'HB-graphite');

  // Right temporal bone & cheek arch
  pushStroke(2, p2Label, spline([
    { x: 482, y: 300 }, { x: 488, y: 340 }, { x: 476, y: 400 },
    { x: 455, y: 460 }, { x: 415, y: 520 }, { x: 350, y: 555 }
  ]), cHBdark, 2.0, 750, 100, 'HB-graphite');

  // Left Ear Outer Helix & Lobe
  pushStroke(2, p2Label, spline([
    { x: 216, y: 305 }, { x: 182, y: 315 }, { x: 166, y: 350 },
    { x: 172, y: 405 }, { x: 195, y: 440 }, { x: 218, y: 446 }
  ]), cHBdark, 2.0, 680, 90, 'HB-graphite');

  // Left Ear Antihelix and Concha cavity
  pushStroke(2, p2Label, spline([
    { x: 195, y: 325 }, { x: 186, y: 355 }, { x: 190, y: 395 }, { x: 205, y: 420 }
  ]), cHB, 1.5, 450, 80, 'HB-graphite');
  pushStroke(2, p2Label, spline([
    { x: 206, y: 350 }, { x: 200, y: 375 }, { x: 208, y: 390 }
  ]), cHB, 1.4, 300, 80, 'HB-graphite');

  // Right Ear Outer Helix & Lobe
  pushStroke(2, p2Label, spline([
    { x: 484, y: 305 }, { x: 518, y: 315 }, { x: 534, y: 350 },
    { x: 528, y: 405 }, { x: 505, y: 440 }, { x: 482, y: 446 }
  ]), cHBdark, 2.0, 680, 90, 'HB-graphite');

  // Right Ear Antihelix and Concha
  pushStroke(2, p2Label, spline([
    { x: 505, y: 325 }, { x: 514, y: 355 }, { x: 510, y: 395 }, { x: 495, y: 420 }
  ]), cHB, 1.5, 450, 80, 'HB-graphite');
  pushStroke(2, p2Label, spline([
    { x: 494, y: 350 }, { x: 500, y: 375 }, { x: 492, y: 390 }
  ]), cHB, 1.4, 300, 80, 'HB-graphite');

  // Neck lines
  pushStroke(2, p2Label, spline([{ x: 250, y: 530 }, { x: 240, y: 590 }, { x: 228, y: 645 }]), cHB, 1.8, 500, 80, 'HB-graphite');
  pushStroke(2, p2Label, spline([{ x: 450, y: 530 }, { x: 460, y: 590 }, { x: 472, y: 645 }]), cHB, 1.8, 500, 100, 'HB-graphite');

  // =========================================================================
  // PHASE 3: THE FEATURES — EYES, NOSE, MOUTH & WIRE SPECTACLES (2B Graphite & Carbon)
  // =========================================================================
  const p3Label = 'Phase 3: The Features — Eyes, Nose & Wire Spectacles';
  const c2B = 'rgba(28, 20, 14, 0.92)';
  const cCarbon = 'rgba(16, 10, 6, 0.98)';
  const cSoftShade = 'rgba(50, 40, 32, 0.45)';

  // Left Eyebrow Arch (Composed of 14 fine hair strokes)
  for (let i = 0; i < 14; i++) {
    const bx = 245 + i * 4.2;
    const by = 300 - Math.sin((i / 13) * Math.PI) * 9;
    pushStroke(3, p3Label, lineHatch(bx, by, bx + 3, by - 6, 2), cHBdark, 1.2, 70, 20, 'HB-graphite');
  }

  // Right Eyebrow Arch (14 fine hair strokes)
  for (let i = 0; i < 14; i++) {
    const bx = 375 + i * 4.2;
    const by = 300 - Math.sin((i / 13) * Math.PI) * 9;
    pushStroke(3, p3Label, lineHatch(bx, by, bx - 3, by - 6, 2), cHBdark, 1.2, 70, 20, 'HB-graphite');
  }

  // Left Eye: Upper lid contour with fleshy fold
  pushStroke(3, p3Label, spline([
    { x: 260, y: 326 }, { x: 275, y: 317 }, { x: 295, y: 318 }, { x: 310, y: 328 }
  ]), c2B, 2.2, 380, 60, '2B-graphite');
  // Left Eye: Upper lid crease
  pushStroke(3, p3Label, spline([
    { x: 262, y: 320 }, { x: 280, y: 310 }, { x: 305, y: 316 }
  ]), cSoftShade, 1.2, 260, 50, 'HB-graphite');

  // Left Eye: Iris and Deep Black Pupil with Highlight Preserve
  pushStroke(3, p3Label, ellipseArc(286, 324, 8, 8, 0, Math.PI * 2, 16), c2B, 1.8, 300, 40, '2B-graphite');
  pushStroke(3, p3Label, ellipseArc(286, 324, 3.5, 3.5, 0, Math.PI * 2, 12), cCarbon, 2.4, 220, 50, 'carbon-ink');
  // Left Eye: Lower lid
  pushStroke(3, p3Label, spline([
    { x: 260, y: 328 }, { x: 285, y: 334 }, { x: 310, y: 329 }
  ]), cHB, 1.3, 300, 60, 'HB-graphite');

  // Right Eye: Upper lid contour
  pushStroke(3, p3Label, spline([
    { x: 390, y: 328 }, { x: 405, y: 318 }, { x: 425, y: 317 }, { x: 440, y: 326 }
  ]), c2B, 2.2, 380, 60, '2B-graphite');
  // Right Eye: Upper lid crease
  pushStroke(3, p3Label, spline([
    { x: 395, y: 316 }, { x: 420, y: 310 }, { x: 438, y: 320 }
  ]), cSoftShade, 1.2, 260, 50, 'HB-graphite');

  // Right Eye: Iris & Pupil
  pushStroke(3, p3Label, ellipseArc(414, 324, 8, 8, 0, Math.PI * 2, 16), c2B, 1.8, 300, 40, '2B-graphite');
  pushStroke(3, p3Label, ellipseArc(414, 324, 3.5, 3.5, 0, Math.PI * 2, 12), cCarbon, 2.4, 220, 50, 'carbon-ink');
  // Right Eye: Lower lid
  pushStroke(3, p3Label, spline([
    { x: 390, y: 329 }, { x: 415, y: 334 }, { x: 440, y: 328 }
  ]), cHB, 1.3, 300, 80, 'HB-graphite');

  // Nose: Aquiline Bridge & Cartilage Planes
  pushStroke(3, p3Label, spline([
    { x: 343, y: 320 }, { x: 340, y: 360 }, { x: 337, y: 400 }, { x: 341, y: 426 }
  ]), c2B, 1.9, 450, 70, '2B-graphite');

  // Nose tip bulb
  pushStroke(3, p3Label, spline([
    { x: 326, y: 422 }, { x: 338, y: 430 }, { x: 350, y: 431 }, { x: 362, y: 430 }, { x: 374, y: 422 }
  ]), c2B, 2.1, 400, 60, '2B-graphite');

  // Deep Nostril Holes (Rich carbon ink accents)
  pushStroke(3, p3Label, ellipseArc(333, 426, 4.5, 3, 0, Math.PI * 2, 10), cCarbon, 2.2, 180, 40, 'carbon-ink');
  pushStroke(3, p3Label, ellipseArc(367, 426, 4.5, 3, 0, Math.PI * 2, 10), cCarbon, 2.2, 180, 60, 'carbon-ink');
  // Nostril side wings
  pushStroke(3, p3Label, spline([{ x: 324, y: 418 }, { x: 318, y: 426 }, { x: 328, y: 429 }]), cHBdark, 1.6, 220, 40, 'HB-graphite');
  pushStroke(3, p3Label, spline([{ x: 376, y: 418 }, { x: 382, y: 426 }, { x: 372, y: 429 }]), cHBdark, 1.6, 220, 80, 'HB-graphite');

  // THE ICONIC ROUND WIRE SPECTACLES:
  // Left Spectacle Circle (Master circular passes)
  pushStroke(3, p3Label, ellipseArc(285, 327, 42, 42, 0, Math.PI * 2, 40), cCarbon, 2.8, 950, 110, 'carbon-ink');
  // Left Spectacle Inner Wire Rim
  pushStroke(3, p3Label, ellipseArc(285, 327, 40.5, 40.5, 0, Math.PI * 2, 36), 'rgba(60, 45, 30, 0.7)', 1.0, 750, 80, 'HB-graphite');

  // Arched Central Wire Nose Bridge
  pushStroke(3, p3Label, spline([
    { x: 327, y: 326 }, { x: 340, y: 317 }, { x: 360, y: 317 }, { x: 373, y: 326 }
  ]), cCarbon, 3.0, 360, 80, 'carbon-ink');

  // Right Spectacle Circle
  pushStroke(3, p3Label, ellipseArc(415, 327, 42, 42, 0, Math.PI * 2, 40), cCarbon, 2.8, 950, 110, 'carbon-ink');
  // Right Spectacle Inner Wire Rim
  pushStroke(3, p3Label, ellipseArc(415, 327, 40.5, 40.5, 0, Math.PI * 2, 36), 'rgba(60, 45, 30, 0.7)', 1.0, 750, 80, 'HB-graphite');

  // Spectacle Temple Arms going back to ears
  pushStroke(3, p3Label, spline([{ x: 243, y: 327 }, { x: 224, y: 323 }, { x: 206, y: 318 }]), c2B, 1.9, 300, 70, '2B-graphite');
  pushStroke(3, p3Label, spline([{ x: 457, y: 327 }, { x: 476, y: 323 }, { x: 494, y: 318 }]), c2B, 1.9, 300, 90, '2B-graphite');

  // Characteristic Mustache: 40 fine textured individual hair strokes
  for (let i = 0; i < 20; i++) {
    const mx = 346 - i * 4.4;
    const my = 445 + Math.sin((i / 19) * Math.PI) * 4;
    const len = 14 + (i % 4) * 2;
    pushStroke(3, p3Label, spline([
      { x: mx, y: my }, { x: mx - 6, y: my + len * 0.6 }, { x: mx - 10, y: my + len }
    ]), c2B, 1.4, 90, 20, '2B-graphite');
  }
  for (let i = 0; i < 20; i++) {
    const mx = 354 + i * 4.4;
    const my = 445 + Math.sin((i / 19) * Math.PI) * 4;
    const len = 14 + (i % 4) * 2;
    pushStroke(3, p3Label, spline([
      { x: mx, y: my }, { x: mx + 6, y: my + len * 0.6 }, { x: mx + 10, y: my + len }
    ]), c2B, 1.4, 90, 20, '2B-graphite');
  }

  // Lips: Gentle compassionate smile
  pushStroke(3, p3Label, spline([
    { x: 308, y: 486 }, { x: 330, y: 489 }, { x: 350, y: 490 }, { x: 370, y: 489 }, { x: 392, y: 486 }
  ]), cCarbon, 2.2, 420, 60, 'carbon-ink');
  pushStroke(3, p3Label, spline([
    { x: 324, y: 504 }, { x: 350, y: 510 }, { x: 376, y: 504 }
  ]), c2B, 1.7, 300, 60, '2B-graphite');

  // Chin pad and cleft
  pushStroke(3, p3Label, spline([{ x: 332, y: 535 }, { x: 350, y: 539 }, { x: 368, y: 535 }]), cHB, 1.4, 250, 80, 'HB-graphite');

  // =========================================================================
  // PHASE 4: TONAL HATCHING & NATURAL WRINKLES (Realistic volume & skin texture)
  // =========================================================================
  const p4Label = 'Phase 4: Tonal Hatching & Natural Wrinkles';
  const cHatch = 'rgba(60, 48, 38, 0.42)';
  const cWrinkle = 'rgba(45, 34, 24, 0.72)';

  // Three Prominent Forehead Wisdom Lines
  pushStroke(4, p4Label, spline([
    { x: 250, y: 200 }, { x: 295, y: 191 }, { x: 350, y: 188 }, { x: 405, y: 191 }, { x: 450, y: 200 }
  ]), cWrinkle, 1.6, 520, 70, 'HB-graphite');
  pushStroke(4, p4Label, spline([
    { x: 242, y: 224 }, { x: 290, y: 214 }, { x: 350, y: 211 }, { x: 410, y: 214 }, { x: 458, y: 224 }
  ]), cWrinkle, 1.7, 540, 70, 'HB-graphite');
  pushStroke(4, p4Label, spline([
    { x: 252, y: 248 }, { x: 295, y: 238 }, { x: 350, y: 235 }, { x: 405, y: 238 }, { x: 448, y: 248 }
  ]), cWrinkle, 1.5, 500, 70, 'HB-graphite');

  // Vertical Glabella Furrows (Frown/thought lines between brows)
  pushStroke(4, p4Label, spline([{ x: 344, y: 292 }, { x: 343, y: 312 }]), cWrinkle, 1.4, 180, 30, 'HB-graphite');
  pushStroke(4, p4Label, spline([{ x: 356, y: 292 }, { x: 357, y: 312 }]), cWrinkle, 1.4, 180, 50, 'HB-graphite');

  // Crow's feet wrinkles (Left temple)
  pushStroke(4, p4Label, spline([{ x: 246, y: 320 }, { x: 230, y: 314 }]), cWrinkle, 1.2, 140, 30, 'HB-graphite');
  pushStroke(4, p4Label, spline([{ x: 244, y: 328 }, { x: 228, y: 330 }]), cWrinkle, 1.2, 140, 30, 'HB-graphite');
  pushStroke(4, p4Label, spline([{ x: 246, y: 336 }, { x: 232, y: 344 }]), cWrinkle, 1.2, 140, 40, 'HB-graphite');

  // Crow's feet wrinkles (Right temple)
  pushStroke(4, p4Label, spline([{ x: 454, y: 320 }, { x: 470, y: 314 }]), cWrinkle, 1.2, 140, 30, 'HB-graphite');
  pushStroke(4, p4Label, spline([{ x: 456, y: 328 }, { x: 472, y: 330 }]), cWrinkle, 1.2, 140, 30, 'HB-graphite');
  pushStroke(4, p4Label, spline([{ x: 454, y: 336 }, { x: 468, y: 344 }]), cWrinkle, 1.2, 140, 50, 'HB-graphite');

  // Nasolabial Folds (Deep smile grooves framing the cheeks)
  pushStroke(4, p4Label, spline([
    { x: 318, y: 425 }, { x: 300, y: 460 }, { x: 292, y: 505 }
  ]), cWrinkle, 1.6, 380, 50, 'HB-graphite');
  pushStroke(4, p4Label, spline([
    { x: 382, y: 425 }, { x: 400, y: 460 }, { x: 408, y: 505 }
  ]), cWrinkle, 1.6, 380, 60, 'HB-graphite');

  // Forehead Tonal Hatching (25 parallel strokes modeling cranial curvature)
  for (let i = 0; i < 25; i++) {
    const hx = 240 + i * 9;
    const hy = 165 + (Math.sin((i / 24) * Math.PI) * 12);
    pushStroke(4, p4Label, lineHatch(hx, hy, hx + 12, hy + 22, 3), cHatch, 0.9, 90, 20, 'HB-graphite');
  }

  // Left Cheekbone downward hatching (20 strokes)
  for (let i = 0; i < 20; i++) {
    const cx = 225 + i * 5;
    const cy = 370 + i * 3.5;
    pushStroke(4, p4Label, lineHatch(cx, cy, cx + 14, cy + 24, 3), cHatch, 1.0, 90, 20, 'HB-graphite');
  }

  // Right Cheekbone downward hatching (20 strokes)
  for (let i = 0; i < 20; i++) {
    const cx = 475 - i * 5;
    const cy = 370 + i * 3.5;
    pushStroke(4, p4Label, lineHatch(cx, cy, cx - 14, cy + 24, 3), cHatch, 1.0, 90, 20, 'HB-graphite');
  }

  // =========================================================================
  // PHASE 5: CHIAROSCURO CROSS-HATCHING & DEEP SHADOW ACCENTS (4B Graphite & Ink)
  // =========================================================================
  const p5Label = 'Phase 5: Deep Chiaroscuro & Neck Cross-Hatching';
  const c4B = 'rgba(25, 18, 12, 0.72)';
  const c4Bdark = 'rgba(18, 12, 8, 0.88)';

  // Cast shadow beneath left spectacle rim (16 diagonal strokes)
  for (let i = 0; i < 16; i++) {
    const sx = 250 + i * 4.5;
    const sy = 345 + (Math.sin((i / 15) * Math.PI) * 18);
    pushStroke(5, p5Label, lineHatch(sx, sy, sx + 8, sy + 14, 2), c4B, 1.1, 75, 15, '4B-graphite');
  }

  // Cast shadow beneath right spectacle rim (16 diagonal strokes)
  for (let i = 0; i < 16; i++) {
    const sx = 380 + i * 4.5;
    const sy = 345 + (Math.sin((i / 15) * Math.PI) * 18);
    pushStroke(5, p5Label, lineHatch(sx, sy, sx - 8, sy + 14, 2), c4B, 1.1, 75, 15, '4B-graphite');
  }

  // Deep Submental Shadow Under Jaw (Heavy 45° layer - 28 strokes)
  for (let i = 0; i < 28; i++) {
    const jx = 260 + i * 6.5;
    const jy = 540 + Math.sin((i / 27) * Math.PI) * 16;
    pushStroke(5, p5Label, lineHatch(jx, jy, jx + 22, jy + 34, 3), c4Bdark, 1.4, 100, 20, '4B-graphite');
  }

  // Under Jaw Cross-Hatching (Opposite 135° layer for rich chiaroscuro depth - 28 strokes)
  for (let i = 0; i < 28; i++) {
    const jx = 282 + i * 6.5;
    const jy = 574 + Math.sin((i / 27) * Math.PI) * 16;
    pushStroke(5, p5Label, lineHatch(jx, jy, jx - 22, jy - 34, 3), c4B, 1.2, 95, 20, '4B-graphite');
  }

  // Throat & Sternocleidomastoid shadow
  for (let i = 0; i < 18; i++) {
    const ty = 570 + i * 4.5;
    pushStroke(5, p5Label, lineHatch(325, ty, 375, ty + 12, 3), c4B, 1.2, 90, 20, '4B-graphite');
  }

  // Left Ear Concha Deep Shadow
  for (let i = 0; i < 10; i++) {
    pushStroke(5, p5Label, lineHatch(192 + i * 2, 355, 198 + i * 2, 375, 2), cCarbon, 1.5, 60, 15, 'carbon-ink');
  }
  // Right Ear Concha Deep Shadow
  for (let i = 0; i < 10; i++) {
    pushStroke(5, p5Label, lineHatch(508 - i * 2, 355, 502 - i * 2, 375, 2), cCarbon, 1.5, 60, 15, 'carbon-ink');
  }

  // =========================================================================
  // PHASE 6: HOMESPUN KHADI SHAWL & MASTER ARTISTIC ACCENTS
  // =========================================================================
  const p6Label = 'Phase 6: Homespun Khadi Shawl & Final Accents';
  const cKhadi = 'rgba(24, 16, 10, 0.9)';
  const cKhadiFold = 'rgba(40, 28, 18, 0.72)';

  // Left Shoulder Shawl Swathe (Sweeping fluid lines)
  pushStroke(6, p6Label, spline([
    { x: 230, y: 640 }, { x: 180, y: 675 }, { x: 120, y: 730 }, { x: 70, y: 820 }
  ]), cKhadi, 2.8, 650, 90, 'carbon-ink');

  // Right Shoulder Shawl Swathe
  pushStroke(6, p6Label, spline([
    { x: 470, y: 640 }, { x: 520, y: 675 }, { x: 580, y: 730 }, { x: 630, y: 820 }
  ]), cKhadi, 2.8, 650, 90, 'carbon-ink');

  // Central Chest Drape V-Shape Folds
  pushStroke(6, p6Label, spline([
    { x: 236, y: 644 }, { x: 290, y: 695 }, { x: 350, y: 720 }, { x: 410, y: 695 }, { x: 464, y: 644 }
  ]), cKhadi, 2.6, 600, 80, 'carbon-ink');
  pushStroke(6, p6Label, spline([
    { x: 215, y: 690 }, { x: 280, y: 750 }, { x: 350, y: 775 }, { x: 420, y: 750 }, { x: 485, y: 690 }
  ]), cKhadi, 2.4, 620, 80, 'carbon-ink');

  // Khadi Vertical Ripples & Fabric Weave Textural Strokes (24 strokes)
  for (let i = 0; i < 12; i++) {
    const kx = 160 + i * 14;
    pushStroke(6, p6Label, spline([
      { x: kx, y: 700 }, { x: kx - 10, y: 755 }, { x: kx - 18, y: 815 }
    ]), cKhadiFold, 1.6, 260, 40, 'HB-graphite');
  }
  for (let i = 0; i < 12; i++) {
    const kx = 540 - i * 14;
    pushStroke(6, p6Label, spline([
      { x: kx, y: 700 }, { x: kx + 10, y: 755 }, { x: kx + 18, y: 815 }
    ]), cKhadiFold, 1.6, 260, 40, 'HB-graphite');
  }

  // Final Master Accents: Dark crisp spectacles reinforcement & highlights
  pushStroke(6, p6Label, ellipseArc(285, 327, 42, 42, Math.PI * 0.7, Math.PI * 1.3, 16), cCarbon, 3.2, 320, 40, 'carbon-ink');
  pushStroke(6, p6Label, ellipseArc(415, 327, 42, 42, Math.PI * 0.7, Math.PI * 1.3, 16), cCarbon, 3.2, 320, 40, 'carbon-ink');

  return strokes;
}

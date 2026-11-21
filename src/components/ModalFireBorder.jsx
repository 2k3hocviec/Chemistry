import React, { useRef, useEffect } from 'react';

// Color themes based on category:
// noble = gold/amber, metal = cyan, nonmetal = pink/magenta
const FIRE_PALETTES = {
  noble: {
    core: 'rgba(255, 255, 235, 0.95)',
    inner: 'rgba(255, 205, 40, 0.85)',
    mid: 'rgba(255, 110, 0, 0.55)',
    outer: 'rgba(200, 30, 0, 0)',
    ember: '#ffd43f',
    sparks: 'rgba(255, 230, 100, 0.9)',
  },
  metal: {
    core: 'rgba(235, 255, 255, 0.95)',
    inner: 'rgba(45, 226, 230, 0.85)',
    mid: 'rgba(0, 140, 255, 0.55)',
    outer: 'rgba(0, 40, 180, 0)',
    ember: '#38bdf8',
    sparks: 'rgba(100, 240, 255, 0.9)',
  },
  nonmetal: {
    core: 'rgba(255, 238, 250, 0.95)',
    inner: 'rgba(255, 79, 163, 0.85)',
    mid: 'rgba(220, 20, 120, 0.55)',
    outer: 'rgba(130, 0, 70, 0)',
    ember: '#f472b6',
    sparks: 'rgba(255, 150, 210, 0.9)',
  },
};

export default function ModalFireBorder({ category = 'metal' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    const PAD = 80; // Margin around modal card for fire licking outward
    const CORNER_RADIUS = 12;

    const palette = FIRE_PALETTES[category] || FIRE_PALETTES.metal;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.round(rect.width + PAD * 2);
      height = Math.round(rect.height + PAD * 2);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.left = `-${PAD}px`;
        canvas.style.top = `-${PAD}px`;
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Build the rounded rectangle perimeter anchor points
    const buildPerimeterAnchors = (cardW, cardH, r, step = 9) => {
      const anchors = [];
      const wStraight = cardW - 2 * r;
      const hStraight = cardH - 2 * r;

      // 1. Top edge: Left to Right
      for (let x = PAD + r; x < PAD + r + wStraight; x += step) {
        anchors.push({ x, y: PAD, nx: 0, ny: -1, tx: 1, ty: 0 });
      }

      // 2. Top-Right Corner Arc: -PI/2 to 0
      const trCx = PAD + cardW - r;
      const trCy = PAD + r;
      const arcSteps = Math.max(5, Math.floor((r * Math.PI * 0.5) / step));
      for (let i = 0; i <= arcSteps; i++) {
        const ang = -Math.PI / 2 + (Math.PI / 2) * (i / arcSteps);
        const nx = Math.cos(ang);
        const ny = Math.sin(ang);
        anchors.push({ x: trCx + nx * r, y: trCy + ny * r, nx, ny, tx: -ny, ty: nx });
      }

      // 3. Right edge: Top to Bottom
      for (let y = PAD + r; y < PAD + r + hStraight; y += step) {
        anchors.push({ x: PAD + cardW, y, nx: 1, ny: 0, tx: 0, ty: 1 });
      }

      // 4. Bottom-Right Corner Arc: 0 to PI/2
      const brCx = PAD + cardW - r;
      const brCy = PAD + cardH - r;
      for (let i = 0; i <= arcSteps; i++) {
        const ang = (Math.PI / 2) * (i / arcSteps);
        const nx = Math.cos(ang);
        const ny = Math.sin(ang);
        anchors.push({ x: brCx + nx * r, y: brCy + ny * r, nx, ny, tx: -ny, ty: nx });
      }

      // 5. Bottom edge: Right to Left
      for (let x = PAD + cardW - r; x > PAD + r; x -= step) {
        anchors.push({ x, y: PAD + cardH, nx: 0, ny: 1, tx: -1, ty: 0 });
      }

      // 6. Bottom-Left Corner Arc: PI/2 to PI
      const blCx = PAD + r;
      const blCy = PAD + cardH - r;
      for (let i = 0; i <= arcSteps; i++) {
        const ang = Math.PI / 2 + (Math.PI / 2) * (i / arcSteps);
        const nx = Math.cos(ang);
        const ny = Math.sin(ang);
        anchors.push({ x: blCx + nx * r, y: blCy + ny * r, nx, ny, tx: -ny, ty: nx });
      }

      // 7. Left edge: Bottom to Top
      for (let y = PAD + cardH - r; y > PAD + r; y -= step) {
        anchors.push({ x: PAD, y, nx: -1, ny: 0, tx: 0, ty: -1 });
      }

      // 8. Top-Left Corner Arc: PI to 3*PI/2
      const tlCx = PAD + r;
      const tlCy = PAD + r;
      for (let i = 0; i <= arcSteps; i++) {
        const ang = Math.PI + (Math.PI / 2) * (i / arcSteps);
        const nx = Math.cos(ang);
        const ny = Math.sin(ang);
        anchors.push({ x: tlCx + nx * r, y: tlCy + ny * r, nx, ny, tx: -ny, ty: nx });
      }

      return anchors;
    };

    // Embers / floating sparks system
    const NUM_EMBERS = 55;
    const embers = [];

    const spawnEmber = (e, cardW, cardH) => {
      const perimeter = 2 * (cardW + cardH);
      const rand = Math.random() * perimeter;
      let x = PAD, y = PAD;

      if (rand < cardW) {
        x = PAD + rand;
        y = PAD;
      } else if (rand < cardW + cardH) {
        x = PAD + cardW;
        y = PAD + (rand - cardW);
      } else if (rand < 2 * cardW + cardH) {
        x = PAD + (rand - (cardW + cardH));
        y = PAD + cardH;
      } else {
        x = PAD;
        y = PAD + (rand - (2 * cardW + cardH));
      }

      e.x = x + (Math.random() - 0.5) * 16;
      e.y = y + (Math.random() - 0.5) * 16;
      e.vx = (Math.random() - 0.5) * 1.1;
      e.vy = -(Math.random() * 2.0 + 1.0); // embers drift upwards
      e.size = Math.random() * 2.5 + 1.2;
      e.life = 0;
      e.maxLife = Math.floor(Math.random() * 45 + 35);
      e.seed = Math.random() * 100;
    };

    for (let i = 0; i < NUM_EMBERS; i++) {
      const e = {};
      spawnEmber(e, width - PAD * 2, height - PAD * 2);
      e.life = Math.floor(Math.random() * e.maxLife);
      embers.push(e);
    }

    let time = 0;

    const render = () => {
      time += 0.06;
      const cardW = width - PAD * 2;
      const cardH = height - PAD * 2;

      // 1. Clear to 100% native alpha 0. Zero black pixels!
      ctx.clearRect(0, 0, width, height);

      if (cardW <= 0 || cardH <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const anchors = buildPerimeterAnchors(cardW, cardH, CORNER_RADIUS, 8);
      const total = anchors.length;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // 2. DRAW INDIVIDUAL FLICKERING FLAME TONGUES AROUND THE PERIMETER
      // Each tongue is a sharp curved cone reaching outwards with a radiant gradient
      for (let i = 0; i < total; i++) {
        const a = anchors[i];
        const s = i * 0.35;

        // Wave harmonics for realistic roaring flame dynamics
        const w1 = Math.sin(s * 1.4 + time * 4.2);
        const w2 = Math.sin(s * 3.1 - time * 5.8);
        const w3 = Math.cos(s * 6.5 + time * 8.6);
        const raw = (w1 * 0.45 + w2 * 0.35 + w3 * 0.2 + 1) * 0.5;

        // Height of the licking tongue
        const tonguePwr = Math.pow(Math.max(0, Math.min(1, raw)), 2.0);
        const reach = tonguePwr * 46 + 10; // reaches 10px to 56px out

        // Base width of tongue along tangent
        const baseHalfW = 7 + raw * 4;

        // Lateral sway of flame tip
        const sway = Math.sin(time * 5.5 + s * 2.0) * 4.5;

        // Base vertices
        const b1x = a.x - a.tx * baseHalfW;
        const b1y = a.y - a.ty * baseHalfW;
        const b2x = a.x + a.tx * baseHalfW;
        const b2y = a.y + a.ty * baseHalfW;

        // Tip position
        const tipX = a.x + a.nx * reach + a.tx * sway;
        const tipY = a.y + a.ny * reach + a.ty * sway;

        // Control points for organic curved flame tongue
        const ctrl1x = a.x + a.nx * (reach * 0.45) - a.tx * (baseHalfW * 0.5);
        const ctrl1y = a.y + a.ny * (reach * 0.45) - a.ty * (baseHalfW * 0.5);
        const ctrl2x = a.x + a.nx * (reach * 0.45) + a.tx * (baseHalfW * 0.5);
        const ctrl2y = a.y + a.ny * (reach * 0.45) + a.ty * (baseHalfW * 0.5);

        // Linear gradient from hot base to transparent tip
        const grad = ctx.createLinearGradient(a.x, a.y, tipX, tipY);
        grad.addColorStop(0, palette.core);
        grad.addColorStop(0.25, palette.inner);
        grad.addColorStop(0.65, palette.mid);
        grad.addColorStop(1, palette.outer);

        ctx.beginPath();
        ctx.moveTo(b1x, b1y);
        ctx.quadraticCurveTo(ctrl1x, ctrl1y, tipX, tipY);
        ctx.quadraticCurveTo(ctrl2x, ctrl2y, b2x, b2y);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 3. SECOND PASS: INNER INTENSE HEAT RIM (Bright white-hot core at the border)
      for (let i = 0; i < total; i += 2) {
        const a = anchors[i];
        const s = i * 0.35;
        const w = (Math.sin(s * 2.2 + time * 5.0) + 1) * 0.5;
        const reach = 8 + w * 10;
        const baseHalfW = 6;

        const b1x = a.x - a.tx * baseHalfW;
        const b1y = a.y - a.ty * baseHalfW;
        const b2x = a.x + a.tx * baseHalfW;
        const b2y = a.y + a.ty * baseHalfW;
        const tipX = a.x + a.nx * reach;
        const tipY = a.y + a.ny * reach;

        const grad = ctx.createLinearGradient(a.x, a.y, tipX, tipY);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.5, palette.inner);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.moveTo(b1x, b1y);
        ctx.lineTo(tipX, tipY);
        ctx.lineTo(b2x, b2y);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 4. FLOATING SPARKS & EMBERS RISING UP INTO SPACE
      for (let i = 0; i < NUM_EMBERS; i++) {
        const e = embers[i];
        e.life++;
        if (e.life >= e.maxLife) {
          spawnEmber(e, cardW, cardH);
        }

        e.x += e.vx + Math.sin(time * 2.8 + e.seed) * 0.45;
        e.y += e.vy;

        const progress = e.life / e.maxLife;
        const alpha = (1 - progress) * (Math.sin(e.life * 0.5 + e.seed) * 0.3 + 0.7);

        if (alpha > 0.02) {
          ctx.fillStyle = palette.ember;
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.beginPath();
          const s = e.size;
          // Sparkle diamond shape
          ctx.moveTo(e.x, e.y - s * 1.2);
          ctx.lineTo(e.x + s * 0.6, e.y);
          ctx.lineTo(e.x, e.y + s * 1.2);
          ctx.lineTo(e.x - s * 0.6, e.y);
          ctx.closePath();
          ctx.fill();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
    };
  }, [category]);

  return (
    <canvas
      ref={canvasRef}
      className={`fire-canvas-overlay ${category}`}
      aria-hidden="true"
    />
  );
}

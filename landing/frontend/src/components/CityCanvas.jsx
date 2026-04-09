import { useEffect, useRef } from 'react';

export default function CityCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Building ──────────────────────────────────────────────────────
    class Building {
      constructor(x, w, h, hue) {
        this.x = x; this.w = w; this.h = h; this.hue = hue;
        this.windows = [];
        const rows = Math.floor(h / 14), cols = Math.floor(w / 8);
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            this.windows.push({
              x: 4 + c * 8, y: 6 + r * 14,
              on: Math.random() > 0.35,
              blink: Math.random() < 0.02,
              timer: Math.random() * 200,
            });
      }
      draw(base) {
        const grad = ctx.createLinearGradient(this.x, base - this.h, this.x + this.w, base);
        grad.addColorStop(0, `hsla(${this.hue},60%,8%,0.92)`);
        grad.addColorStop(1, `hsla(${this.hue},50%,4%,0.98)`);
        ctx.fillStyle = grad;
        ctx.fillRect(this.x, base - this.h, this.w, this.h);
        ctx.strokeStyle = `hsla(${this.hue},80%,30%,0.2)`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(this.x, base - this.h, this.w, this.h);
        this.windows.forEach(w => {
          if (w.blink) { w.timer--; if (w.timer < 0) { w.on = !w.on; w.timer = 60 + Math.random() * 300; } }
          if (!w.on) return;
          ctx.fillStyle = `rgba(255,240,180,${0.5 + Math.random() * 0.3})`;
          ctx.fillRect(this.x + w.x, base - this.h + w.y, 4, 7);
        });
        if (this.w > 20) {
          ctx.strokeStyle = 'rgba(0,229,255,0.3)'; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(this.x + this.w / 2, base - this.h);
          ctx.lineTo(this.x + this.w / 2, base - this.h - 12); ctx.stroke();
          ctx.beginPath();
          ctx.arc(this.x + this.w / 2, base - this.h - 13, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,80,80,${0.4 + Math.sin(Date.now() / 600) * 0.4})`;
          ctx.fill();
        }
      }
    }

    // ── TrafficFlow ───────────────────────────────────────────────────
    class TrafficFlow {
      constructor(y, dir, color, speed, count) {
        this.y = y; this.dir = dir; this.color = color; this.speed = speed;
        this.cars = Array.from({ length: count }, () => ({
          x: Math.random() * canvas.width,
          len: 6 + Math.random() * 14,
          alpha: 0.4 + Math.random() * 0.5,
          offset: Math.random() * 3,
        }));
      }
      update() {
        this.cars.forEach(c => {
          c.x += this.speed * this.dir;
          if (this.dir > 0 && c.x > canvas.width + 20) c.x = -20;
          if (this.dir < 0 && c.x < -20) c.x = canvas.width + 20;
        });
      }
      draw() {
        this.cars.forEach(c => {
          const grad = ctx.createLinearGradient(c.x - c.len * this.dir, this.y, c.x, this.y);
          const col  = this.color.replace('rgb(', 'rgba(').replace(')', `,${c.alpha})`);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(1, col);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5 + c.offset * 0.3;
          ctx.beginPath();
          ctx.moveTo(c.x - c.len * this.dir * 2, this.y);
          ctx.lineTo(c.x, this.y); ctx.stroke();
        });
      }
    }

    // ── Ambulance ─────────────────────────────────────────────────────
    class Ambulance {
      constructor() { this.reset(); this.sirenTimer = 0; this.sirenOn = true; }
      reset() {
        this.y     = canvas.height * (0.52 + Math.random() * 0.12);
        this.x     = -30;
        this.speed = 3.5 + Math.random() * 1.5;
      }
      update() {
        this.x += this.speed;
        this.sirenTimer++;
        if (this.sirenTimer > 18) { this.sirenOn = !this.sirenOn; this.sirenTimer = 0; }
        if (this.x > canvas.width + 60) this.reset();
      }
      draw() {
        const x = this.x, y = this.y;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(x - 10, y - 4, 18, 7);
        ctx.fillStyle = 'rgba(220,220,220,0.9)';
        ctx.fillRect(x - 6, y - 7, 10, 4);
        const s1 = this.sirenOn ? 'rgba(0,150,255,0.95)' : 'rgba(255,120,0,0.95)';
        const s2 = this.sirenOn ? 'rgba(255,120,0,0.95)' : 'rgba(0,150,255,0.95)';
        ctx.fillStyle = s1; ctx.fillRect(x - 5, y - 9, 4, 3);
        ctx.fillStyle = s2; ctx.fillRect(x,     y - 9, 4, 3);
        const g = ctx.createRadialGradient(x, y - 8, 0, x, y - 8, 18);
        g.addColorStop(0, 'rgba(0,120,255,0.18)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - 8, 18, 0, Math.PI * 2); ctx.fill();
        const hl = ctx.createLinearGradient(x + 8, y, x + 40, y);
        hl.addColorStop(0, 'rgba(255,255,220,0.6)'); hl.addColorStop(1, 'rgba(255,255,220,0)');
        ctx.fillStyle = hl;
        ctx.beginPath();
        ctx.moveTo(x + 8, y - 2); ctx.lineTo(x + 40, y - 5);
        ctx.lineTo(x + 40, y + 4); ctx.lineTo(x + 8, y + 3);
        ctx.closePath(); ctx.fill();
      }
    }

    // ── Init escena ───────────────────────────────────────────────────
    let buildings = [], flows = [], ambulance;

    function initScene() {
      buildings = []; flows = [];
      const base = canvas.height * 0.7;
      for (let x = 0; x < canvas.width; x += 18 + Math.random() * 30)
        buildings.push(new Building(x, 14 + Math.random() * 20, 40 + Math.random() * (canvas.height * 0.22), 200 + Math.random() * 40));
      for (let x = -10; x < canvas.width; x += 22 + Math.random() * 40)
        buildings.push(new Building(x, 18 + Math.random() * 35, 60 + Math.random() * (canvas.height * 0.3), 195 + Math.random() * 50));
      for (let x = -20; x < canvas.width; x += 35 + Math.random() * 55)
        buildings.push(new Building(x, 28 + Math.random() * 50, canvas.height * 0.25 + Math.random() * (canvas.height * 0.35), 200 + Math.random() * 30));

      const rY = canvas.height * 0.62;
      flows = [
        new TrafficFlow(rY - 4,  +1, 'rgb(255,255,220)', 2.2, 28),
        new TrafficFlow(rY - 2,  +1, 'rgb(255,240,180)', 1.6, 18),
        new TrafficFlow(rY + 3,  -1, 'rgb(255,60,60)',   1.9, 22),
        new TrafficFlow(rY + 5,  -1, 'rgb(255,80,80)',   1.4, 16),
        new TrafficFlow(rY + 18, +1, 'rgb(200,220,255)', 1.1, 14),
        new TrafficFlow(rY + 20, -1, 'rgb(255,50,50)',   1.3, 12),
        new TrafficFlow(rY - 18, +1, 'rgb(255,255,200)', 0.9, 10),
      ];
      ambulance = new Ambulance();
    }

    initScene();
    window.addEventListener('resize', initScene);

    // ── Draw loop ─────────────────────────────────────────────────────
    function draw() {
      const W = canvas.width, H = canvas.height;
      const base = H * 0.7;

      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0,    '#020408');
      sky.addColorStop(0.45, '#040812');
      sky.addColorStop(0.65, '#060c1a');
      sky.addColorStop(0.72, '#0a1020');
      sky.addColorStop(1,    '#0a0c16');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      // Estrellas
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 120; i++) {
        const sx = ((i * 137.5) % 1) * W, sy = ((i * 93.7) % 1) * (H * 0.45);
        ctx.beginPath(); ctx.arc(sx, sy, Math.random() < 0.1 ? 1.2 : 0.5, 0, Math.PI * 2); ctx.fill();
      }

      // Resplandor horizonte
      const glow = ctx.createLinearGradient(0, base - 30, 0, base + 60);
      glow.addColorStop(0, 'rgba(0,60,120,0)'); glow.addColorStop(0.3, 'rgba(0,120,200,0.08)');
      glow.addColorStop(0.6, 'rgba(0,229,255,0.05)'); glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow; ctx.fillRect(0, base - 60, W, 140);

      const og = ctx.createRadialGradient(W * 0.75, base, 0, W * 0.75, base, W * 0.55);
      og.addColorStop(0, 'rgba(255,100,0,0.06)'); og.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = og; ctx.fillRect(0, 0, W, H);

      buildings.forEach(b => b.draw(base));

      const ground = ctx.createLinearGradient(0, base, 0, base + 80);
      ground.addColorStop(0, 'rgba(10,15,25,0.95)'); ground.addColorStop(1, 'rgba(5,8,14,1)');
      ctx.fillStyle = ground; ctx.fillRect(0, base, W, H - base);

      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
      [0, 8, 16, 24].forEach(o => { ctx.beginPath(); ctx.moveTo(0, base + o); ctx.lineTo(W, base + o); ctx.stroke(); });

      flows.forEach(f => { f.update(); f.draw(); });
      ambulance.update(); ambulance.draw();

      const fog = ctx.createLinearGradient(0, 0, 0, H * 0.25);
      fog.addColorStop(0, 'rgba(2,4,8,0.7)'); fog.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fog; ctx.fillRect(0, 0, W, H * 0.25);

      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(0,0,5,0.65)');
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', initScene);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:'fixed', top:0, left:0,
        width:'100%', height:'100%',
        zIndex:0, opacity:0.85,
        pointerEvents:'none',
      }}
    />
  );
}

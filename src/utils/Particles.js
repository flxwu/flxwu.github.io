import COLORS from './Colors';

class Particle {
  constructor(x, y, ww, wh, ctx) {
    this.ctx = ctx;
    this.x = Math.random() * ww;
    this.y = Math.random() * wh;
    this.dest = { x, y };
    this.r = Math.random() * 2 + 2;
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.94;
    this.color = COLORS[Math.floor(Math.random() * 7)];
  }

  render(mouse) {
    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    this.ctx.fill();
    // distance mouse-particle
    const dx = Math.abs(this.x - mouse.x);
    const dy = Math.abs(this.y - mouse.y);
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance < 100) {
      this.accX = (this.x - mouse.x) / 100;
      this.accY = (this.y - mouse.y) / 100;
      this.vx += this.accX;
      this.vy += this.accY;
    }
  }
}

export default Particle;

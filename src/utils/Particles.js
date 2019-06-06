import { COLORS } from './index';

class Particle {
  constructor(x, y, ww, wh, ctx, purpose, constraints, color) {
    this.ctx = ctx;
    this.x = Math.random() * ww;
    this.y = Math.random() * wh;
    this.dest = { x, y };
    this.dx = this.dest.x - this.x >= 0;
    this.dy = this.dest.y - this.y >= 0;
    this.r =
      purpose === 'text' ? (4/3) * constraints.particleSize() : constraints.particleSize();
    if (window.innerWidth < 550) this.r *= 1.5;
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.94;
    this.oFriction = this.friction;
    this.throttle = Math.random() * 0.025 + 0.97;
    this.color = color || COLORS[Math.floor(Math.random() * 5)];
    this.purpose = purpose;
  }

  remove() {
    this.dest.x = -9999;
    this.dest.y = -9999;
  }

  render(mouse) {
    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;
    if (this.dest.x - this.x >= 0 !== this.dx) {
      this.friction *= this.throttle;
      this.dx = !this.dx;
    }
    if (this.dest.y - this.y >= 0 !== this.dy) {
      this.friction *= this.throttle;
      this.dy = !this.dy;
    }
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
    if (distance < 150) {
      this.accX = (this.x - mouse.x) / 100;
      this.accY = (this.y - mouse.y) / 100;
      this.vx += this.accX;
      this.vy += this.accY;
      this.friction = this.oFriction;
      this.throttle = Math.random() * 0.025 + 0.965;
    }
  }
}

export default Particle;

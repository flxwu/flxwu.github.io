import COLORS from './Colors';

class Particle {
	constructor(x, y, ww, wh, ctx, mouse) {
		this.ctx = ctx;
		this.mouse = mouse;
		this.x = Math.random() * ww;
		this.y = Math.random() * wh;
		this.dest = {
			x: x,
			y: y
		};
		this.r = Math.random() * 2 + 2;
		this.vx = (Math.random() - 0.5) * 20;
		this.vy = (Math.random() - 0.5) * 20;
		this.accX = 0;
		this.accY = 0;
		this.friction = Math.random() * 0.05 + 0.94;
		this.color = COLORS[Math.floor(Math.random() * 7)];
	}

	render() {
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
		const a = this.x - this.mouse.x;
		const b = this.y - this.mouse.y;
		const distance = Math.sqrt(a * a + b * b);
		if (distance < 70) {
			this.accX = (this.x - this.mouse.x) / 100;
			this.accY = (this.y - this.mouse.y) / 100;
			this.vx += this.accX;
			this.vy += this.accY;
		}
	}
}


export default Particle;
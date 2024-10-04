import { COLORS } from "./index.js";

/**
 * A single particle in the particle animation.
 * Particles are initialized with random positions and velocities.
 * They move towards a destination point and bounce of a radius around the cursor.
 */
class Particle {
  /**
   * Creates a new Particle.
   * @param {number} x - Destination x-coordinate.
   * @param {number} y - Destination y-coordinate.
   * @param {number} ww - Canvas width.
   * @param {number} wh - Canvas height.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {string} purpose - Purpose of the particle ("text" or other).
   * @param {object} constraints - Constraints for particle size.
   * @param {string} [color] - Optional color of the particle.
   */
  constructor(x, y, ww, wh, ctx, purpose, constraints, color) {
    this.ctx = ctx;

    // Initialize particle position with a slight random offset
    this.x = (Math.sin(Math.random()) * ww) / 10 + x;
    this.y = (Math.sin(Math.random()) * wh) / 10 + y;

    // Set destination position
    this.dest = { x, y };

    this.XPosIsLeftOfDest = this.x <= this.dest.x;
    this.YPosIsUpOfDst = this.y <= this.dest.y;

    // If the particle is part of a text, increase its radius
    this.r =
      purpose === "text"
        ? 1.3 * constraints.particleSize()
        : constraints.particleSize();

    // Increase radius on small screens
    if (window.innerWidth < 550) this.r *= 1.5;

    // Initialize velocity with random values (-2.5 to 2.5)
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;

    // Initialize acceleration
    this.accX = 0;
    this.accY = 0;

    // Random friction coefficient between 0.94 and 0.99 to simulate drag
    this.friction = Math.random() * 0.05 + 0.94;

    // Store the original friction value
    this.oFriction = this.friction;

    // Random throttle value between 0.97 and 0.995 to adjust friction over time
    this.throttle = Math.random() * 0.025 + 0.97;

    // Set particle color; use provided color or pick random from COLORS
    this.color = color || COLORS[Math.floor(Math.random() * 5)];

    // Store the purpose (e.g., "text")
    this.purpose = purpose;
  }

  /**
   * Removes the particle by setting its destination off-screen.
   */
  remove() {
    // Move the particle off-screen by setting destination coordinates
    this.dest.x = -9999;
    this.dest.y = -9999;
  }

  /**
   * Updates particle position, applies interactions, and renders it.
   * @param {object} mouse - Object containing mouse x and y coordinates.
   */
  render(mouse) {
    // Calculate acceleration towards destination
    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;

    // Check if particle has crossed its destination in x-direction
    if (this.dest.x - this.x >= 0 !== this.XPosIsLeftOfDest) {
      // Adjust friction using throttle
      this.friction *= this.throttle;
      // Toggle direction flag
      this.XPosIsLeftOfDest = !this.XPosIsLeftOfDest;
    }

    // Check if particle has crossed its destination in y-direction
    if (this.dest.y - this.y >= 0 !== this.YPosIsUpOfDst) {
      // Adjust friction using throttle
      this.friction *= this.throttle;
      // Toggle direction flag
      this.YPosIsUpOfDst = !this.YPosIsUpOfDst;
    }

    // Update velocity with acceleration
    this.vx += this.accX;
    this.vy += this.accY;

    // Apply friction to velocity
    this.vx *= this.friction;
    this.vy *= this.friction;

    // Update position with velocity
    this.x += this.vx;
    this.y += this.vy;

    // Draw the particle on the canvas
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    this.ctx.fill();

    // Calculate distance between particle and mouse cursor
    const dx = Math.abs(this.x - mouse.x);
    const dy = Math.abs(this.y - mouse.y);
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If mouse is within 120 pixels of particle
    if (distance < 120) {
      // Apply repulsion effect away from mouse
      this.accX = (this.x - mouse.x) / 100;
      this.accY = (this.y - mouse.y) / 100;
      this.vx += this.accX;
      this.vy += this.accY;

      // Reset friction to original value
      this.friction = this.oFriction;

      // Adjust throttle slightly
      this.throttle = Math.random() * 0.025 + 0.965;
    }
  }
}

export default Particle;

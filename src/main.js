import { Particle, COLORS, constraints as con } from "./utils/index.js";
import "./styles.scss";
import { timeString } from "./utils/time.js";

let mouse = { x: 0, y: 0 };
let particles = [];
let shapes = [];
let ctx;
let cw, ch;
let shapeCnt = 0;
let constraints;
let mobile = false;

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleRender = () => {
  requestAnimationFrame(particleRender);
  ctx.clearRect(0, 0, cw, ch);
  let allshapesgone = true;
  for (const p of particles) p.render(mouse);
  for (const p of shapes) {
    p.render(mouse);
    if (p.x >= 0 || p.y >= 0) allshapesgone = false;
  }
  if (allshapesgone) shapes = [];
};

const initCanvas = () => {
  ctx = canvas.getContext("2d");
  cw = canvas.width;
  ch = canvas.height;
  mobile = window.innerWidth < 550;
  constraints = mobile ? con(cw, ch).mobile : con(cw, ch).desktop;

  setParticlesToCurrentTime();
};

const setParticlesToCurrentTime = () => {
  ctx.clearRect(0, 0, cw, ch);

  ctx.font = constraints.nameFont;
  ctx.textAlign = "center";
  if (mobile) {
    ctx.fillText("hello!", ...constraints.nameCoords[0]);
  } else {
    ctx.fillText(`${timeString()}`, ...constraints.nameCoords);
  }

  const data = ctx.getImageData(0, 0, cw, ch).data;
  ctx.clearRect(0, 0, cw, ch);
  const newParticles = [];

  for (let i = 0; i < cw; i += constraints.nameStep) {
    for (let j = 0; j < ch; j += constraints.nameStep) {
      // check if pixel is not transparent
      if (data[(i + j * cw) * 4 + 3] > 100) {
        let p = particles.find((p) => p.dest.x === i && p.dest.y === j);
        newParticles.push(
          p || new Particle(i, j, cw, ch, ctx, "text", constraints)
        );
      }
    }
  }
  particles = newParticles;
};

// particle shapes
window.addEventListener("click", (e) => {
  const [x, y] = [e.clientX, e.clientY];
  let step = Math.round(ch / 150);
  if (mobile) step = Math.round(ch / 100);

  const shapeID = Math.floor(Math.random() * 4);
  const color = COLORS[Math.floor(Math.random() * 5)];

  // shape counter
  shapeCnt++;
  if (shapeCnt === 8) {
    shapes.forEach((p) => p.remove());
    shapeCnt = 0;
  }

  // eslint-disable-next-line default-case
  switch (shapeID) {
    case 0: {
      // triangle flood-filling

      const v1 = {
        // top
        x,
        y: y - Math.random() * 55 + 70,
      };
      let dx = Math.random() * 155 + 100;
      let dy = Math.random() * 75 + 80;
      const v2 = {
        // left
        x: x - dx,
        y: y + dy,
      };
      const v3 = {
        // right
        x: x + dx,
        y: y + dy,
      };

      const invslopeLeft = (v2.x - v1.x) / (v2.y - v1.y);
      const invslopeRight = (v3.x - v1.x) / (v3.y - v1.y);
      let boundLeft = v1.x;
      let boundRight = v1.x;

      for (let y = v1.y; y <= v2.y; y += step * 1.25) {
        for (let x = boundLeft; x <= boundRight; x += step * 1.25) {
          shapes.push(
            new Particle(x, y, cw, ch, ctx, "triangle", constraints, color)
          );
        }
        boundLeft += invslopeLeft;
        boundRight += invslopeRight;
      }
      break;
    }
    case 2: {
      // rectangle
      const rect = Math.random() > 0.5;
      let width, height;
      if (rect) {
        width = Math.random() * 25 + 40;
        height = Math.random() * 25 + 40;
      } else {
        width = height = Math.random() * 25 + 40;
      }
      for (let i = x - width / 2; i <= x + width / 2; i += step * 1.25)
        for (let j = y - height / 2; j <= y + height / 2; j += step * 1.25)
          shapes.push(
            new Particle(i, j, cw, ch, ctx, "rect", constraints, color)
          );
      break;
    }
    case 3: {
      // circle
      const r = Math.random() * 25 + 55;

      for (let i = x - r; i <= x + r; i += step) {
        for (let j = y - r; j <= y + r; j += step) {
          const dx = Math.abs(i - x),
            dy = Math.abs(j - y);
          // check if in circle radius
          if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) <= r) {
            const p = new Particle(
              i,
              j,
              cw,
              ch,
              ctx,
              "circle",
              constraints,
              color
            );
            shapes.push(p);
          }
        }
      }
      break;
    }
  }
});

// name particles

window.addEventListener("resize", initCanvas);
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

initCanvas();
requestAnimationFrame(particleRender);
setInterval(() => {
  setParticlesToCurrentTime();
}, 2000);

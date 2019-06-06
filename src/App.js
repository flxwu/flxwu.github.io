import React from 'react';
import { Particle, COLORS, constraints as con } from './utils';
import './styles/App.scss';

let mouse = { x: 0, y: 0 };
let particles = [];
let shapes = [];
let ctx;
let cw, ch;
let shapeCnt = 0;
let constraints;
let mobile = false;

function App() {
  let canvas = React.createRef();

  const particleRender = React.useCallback(() => {
    requestAnimationFrame(particleRender);
    ctx.clearRect(0, 0, cw, ch);
    let allshapesgone = true;
    for (const p of particles) p.render(mouse);
    for (const p of shapes) {
      p.render(mouse);
      if (p.x >= 0 || p.y >= 0) allshapesgone = false;
    }
    if (allshapesgone) shapes = [];
  }, []);

  const initCanvas = React.useCallback(() => {
    // update constraints
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
    ctx = canvas.current.getContext('2d');
    cw = canvas.current.width;
    ch = canvas.current.height;
    mobile = window.innerWidth < 550;
    constraints = mobile ? con(cw, ch).mobile : con(cw, ch).desktop;

    ctx.clearRect(0, 0, cw, ch);

    ctx.font = constraints.nameFont;
    ctx.textAlign = 'center';
    if (mobile) {
      ctx.fillText('Felix', ...constraints.nameCoords[0]);
      ctx.fillText('Wu', ...constraints.nameCoords[1]);
    } else {
      ctx.fillText('Felix Wu', ...constraints.nameCoords);
    }

    const data = ctx.getImageData(0, 0, cw, ch).data;
    ctx.clearRect(0, 0, cw, ch);
    particles = [];

    for (let i = 0; i < cw; i += constraints.nameStep) {
      for (let j = 0; j < ch; j += constraints.nameStep) {
        if (data[(i + j * cw) * 4 + 3] > 100) {
          console.log(constraints);
          particles.push(new Particle(i, j, cw, ch, ctx, 'text', constraints));
        }
      }
    }
  }, [canvas]);

  React.useEffect(() => {
    console.log('in effect');
    // particle shapes
    window.addEventListener('click', e => {
      const [x, y] = [e.clientX, e.clientY];
      let step = Math.round(ch / 150);
      if (mobile) step = Math.round(ch / 100);

      const shapeID = Math.floor(Math.random() * 4);
      const color = COLORS[Math.floor(Math.random() * 5)];

      // shape counter
      shapeCnt++;
      if (shapeCnt === 8) {
        shapes.forEach(p => p.remove());
        shapeCnt = 0;
      }

      // eslint-disable-next-line default-case
      switch (shapeID) {
        case 0: {
          // triangle flood-filling

          const v1 = {
            // top
            x,
            y: y - Math.random() * 55 + 70
          };
          let dx = Math.random() * 155 + 100;
          let dy = Math.random() * 75 + 80;
          const v2 = {
            // left
            x: x - dx,
            y: y + dy
          };
          const v3 = {
            // right
            x: x + dx,
            y: y + dy
          };

          const invslopeLeft = (v2.x - v1.x) / (v2.y - v1.y);
          const invslopeRight = (v3.x - v1.x) / (v3.y - v1.y);
          let boundLeft = v1.x;
          let boundRight = v1.x;

          for (let y = v1.y; y <= v2.y; y += step * 1.25) {
            for (let x = boundLeft; x <= boundRight; x += step * 1.25) {
              shapes.push(
                new Particle(x, y, cw, ch, ctx, 'triangle', constraints, color)
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
                new Particle(i, j, cw, ch, ctx, 'rect', constraints, color)
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
                  'circle',
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

    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    initCanvas();
    requestAnimationFrame(particleRender);
  }, [canvas, initCanvas, particleRender]);

  return (
    <div>
      <canvas
        id="scene"
        ref={canvas}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div className="App">
        <div class="item-top">
          <span>
            Hey there <i className="ec ec-wave" />
          </span>
          <span>
            <span className="small">I'm</span>
          </span>
          <h1 style={{ display: 'none' }}>I'm Felix Wu</h1>
        </div>
        <div className="item-mid">
          I'm an 18-year-old <span className="blue">Software Engineer</span>{' '}
          focussed on <span className="red">JavaScript</span> and{' '}
          <span className="yellow">Python</span>
          <br style={{ lineHeight: '8vh' }} />
          <i>
            Find me on <a href="https://twitter.com/felix_codes">Twitter</a>,{' '}
            <a href="https://github.com/flxwu">GitHub</a> or{' '}
            <a href="https://www.linkedin.com/in/felix-wu-de/">LinkedIn</a>
          </i>
          <br style={{ lineHeight: '5vh' }} />
          <span className="small">
            Move your cursor over the text or click anywhere to interact
          </span>
        </div>
        <footer className="item-bottom">
          Made with <span className="ec ec-green-heart" /> in Germany.
          <br />
          <span>
            Particles are coded from scratch in Vanilla JS - if you're curios
            about them, checkout the code on{' '}
            <a href="https://github.com/flxwu">Github</a>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;

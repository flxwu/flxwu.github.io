import React, { useEffect, useCallback } from 'react';
import Particle from './utils/Particles';
import COLORS from './utils/Colors';
import './styles/App.scss';

let mouse = { x: 0, y: 0 };
let particles = [];
let ctx;
let cw, ch;

function App() {
  let canvas = React.createRef();

  const particleRender = useCallback(() => {
    requestAnimationFrame(particleRender);
    ctx.clearRect(0, 0, cw, ch);
    for (const p of particles) p.render(mouse);
  }, []);

  const initCanvas = useCallback(() => {
    ctx = canvas.current.getContext('2d');
    cw = canvas.current.width;
    ch = canvas.current.height;
    ctx.clearRect(0, 0, cw, ch);

    ctx.font = 'bold ' + cw / 7 + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Felix Wu', cw / 2.5, ch / 2);

    const data = ctx.getImageData(0, 0, cw, ch).data;
    ctx.clearRect(0, 0, cw, ch);
    // ctx.globalCompositeOperation = 'screen';
    particles = [];

    for (let i = 0; i < cw; i += Math.round(cw / 200)) {
      for (let j = 0; j < ch; j += Math.round(cw / 200)) {
        if (data[(i + j * cw) * 4 + 3] > 100) {
          particles.push(new Particle(i, j, cw, ch, ctx, 'text'));
        }
      }
    }
  }, [canvas]);

  useEffect(() => {
    console.log('in effect');
    // particle shapes
    window.addEventListener('click', e => {
      const shapeID = 2;
      // const shapeID = Math.floor(Math.random() * 3);
      // eslint-disable-next-line default-case
      switch (shapeID) {
        case 0: {
          // triangle

          break;
        }
        case 1: {
          // rectangle
          break;
        }
        case 2: {
          // circle
          const [x, y] = [e.clientX, e.clientY];
          const r = Math.random() * 25 + 55;
          let color = COLORS[Math.floor(Math.random() * 5)];
          for (let i = x - r; i <= x + r; i += Math.round(ch / 150)) {
            for (let j = y - r; j <= y + r; j += Math.round(ch / 150)) {
              const dx = Math.abs(i - x),
                dy = Math.abs(j - y);
              if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) <= r) {
                const p = new Particle(i, j, cw, ch, ctx, 'circle', color);
                particles.push(p);
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
    // particles.push(new Particle(500,200,window.innerWidth, window.innerHeight, ctx, 'a'))
    requestAnimationFrame(particleRender);
  }, [canvas, initCanvas, particleRender]);

  return (
    <div className="App">
      <canvas
        id="scene"
        ref={canvas}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div className="App-1">
        <div>
          <span>
            Hey there <i className="ec ec-wave" />
          </span>
          <span>
            <span className="small">I'm</span>
          </span>
        </div>
        <div className="bio">
          I'm an 18-year-old <span className="blue">Software Engineer</span>{' '}
          focussed on <span className="red">JavaScript</span> and{' '}
          <span className="yellow">Python</span>
          <br style={{ lineHeight: '8vh' }} />
          <i>
            Find me on <a href="https://twitter.com/flxwu">Twitter</a>,{' '}
            <a href="https://github.com/flxwu">GitHub</a> or{' '}
            <a href="https://www.linkedin.com/in/felix-wu-de/">LinkedIn</a>
          </i>
        </div>
      </div>
    </div>
  );
}

export default App;

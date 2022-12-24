import Particles from "./Particles";

/* eslint-disable react-hooks/rules-of-hooks */
// const [, updateState] = React => React.useState();
// const forceUpdate = React => React.useCallback(() => updateState({}), []);

export const Particle = Particles;

const aVW = (val, cw) => val * (cw / 100);
const aVH = (val, ch) => val * (ch / 100);

export const constraints = (cw, ch) => ({
  desktop: {
    nameFont: `bold ${aVW(10, cw)}px sans-serif`,
    nameCoords: [cw / 2, ch / 2],
    nameStep: Math.round(cw / 125),
    particleSize: () => Math.random() * aVW(0.15, cw) + aVW(0.2, cw),
  },
  mobile: {
    nameFont: `bold ${aVW(15, cw)}px sans-serif`,
    nameCoords: [
      [cw / 2, aVH(40, ch)],
      [cw / 2, aVH(55, ch)],
      [cw / 2, aVH(70, ch)],
    ],
    nameStep: Math.round(cw / 55),
    particleSize: () => Math.random() * aVW(0.15, cw) + aVW(0.25, cw),
  },
});

export const COLORS = ["#ee4035", "#f37736", "#fdf498", "#7bc043", "#0392cf"];

export default { Particle, COLORS, constraints };

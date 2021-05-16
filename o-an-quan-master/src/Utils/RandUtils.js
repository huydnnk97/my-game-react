import { Shuffle } from "./ArrayUtils";

const RandRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const RandPos = (npos, x_min, x_max, y_min = x_min, y_max = x_max) => {
  if (npos == 1) {
    return [{ x: 50, y: 50 }];
  }
  let xpos = new Array(npos);
  let ypos = new Array(npos);
  for (let i = 0; i < npos; ++i) {
    xpos[i] = RandRange(
      (i * (x_max - x_min)) / npos + x_min,
      ((i + 1) * (x_max - x_min)) / npos + x_min
    );
    ypos[i] = RandRange(
      (i * (y_max - y_min)) / npos + y_min,
      ((i + 1) * (y_max - y_min)) / npos + y_min
    );
  }

  xpos = Shuffle(xpos);
  ypos = Shuffle(ypos);
  return xpos.map((x, i) => ({ x: x, y: ypos[i] }));
};

export { RandRange, RandPos };

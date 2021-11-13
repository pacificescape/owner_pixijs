export class Hex {
  q: any;

  r: any;

  s: any;

  static directions: any;

  diagonals: any;

  x: any;

  y: any;

  constructor (q, r, s) {
    this.q = q;
    this.r = r;
    this.s = s;
    if (Math.round(q + r + s) !== 0) {throw 'q + r + s must be 0';}

    // this.evenRow();
  }

  add (b) {
    return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
  }

  subtract (b) {
    return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
  }

  scale (k) {
    return new Hex(this.q * k, this.r * k, this.s * k);
  }

  rotateLeft () {
    return new Hex(-this.s, -this.q, -this.r);
  }

  rotateRight () {
    return new Hex(-this.r, -this.s, -this.q);
  }

  static direction (direction) {
    return Hex.directions[direction];
  }

  neighbor (direction) {
    return this.add(Hex.direction(direction));
  }

  diagonalNeighbor (direction) {
    return this.add(this.diagonals[direction]);
  }

  len () {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  distance (b) {
    return this.subtract(b).len();
  }

  round () {
    let qi = Math.round(this.q);
    let ri = Math.round(this.r);
    let si = Math.round(this.s);
    const q_diff = Math.abs(qi - this.q);
    const r_diff = Math.abs(ri - this.r);
    const s_diff = Math.abs(si - this.s);

    if (q_diff > r_diff && q_diff > s_diff) {
      qi = -ri - si;
    } else if (r_diff > s_diff) {
      ri = -qi - si;
    } else {
      si = -qi - ri;
    }
    return new Hex(qi, ri, si);
  }

  lerp (b: any, t: any) {
    return new Hex(
      this.q * (1 - t) + b.q * t,
      this.r * (1 - t) + b.r * t,
      this.s * (1 - t) + b.s * t,
    );
  }

  linedraw (b) {
    const N = this.distance(b);
    const a_nudge = new Hex(this.q + 1e-6, this.r + 1e-6, this.s - 2e-6);
    const b_nudge = new Hex(b.q + 1e-6, b.r + 1e-6, b.s - 2e-6);
    const results: Hex[] = [];
    const step = 1 / Math.max(N, 1);

    for (let i = 0; i <= N; i++) {
      results.push(a_nudge.lerp(b_nudge, step * i).round());
    }
    return results;
  }

  evenRow () {
    this.x = this.q + (this.r + (this.r & 1)) / 2;
    this.y = this.r;
    return this;
  }

  evenCol () {
    this.x = this.q;
    this.y = this.r + (this.q + (this.q & 1)) / 2;
    return this;
  }
}

// export function makeHexagonalShape(N) {
//   let results = [];
//   for (let q = -N; q <= N; q++) {
//     for (let r = -N; r <= N; r++) {
//       let hex = new Hex(q, r, -q - r);
//       if (hex.len() <= N) {
//         results.push(hex);
//       }
//     }
//   }
//   return results;
// }

/*
 * From https://www.redblobgames.com/grids/hexagons/
 * Copyright 2018 Red Blob Games <redblobgames@gmail.com>
 * License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
('use strict');

/* global Hex, OffsetCoord, DoubledCoord */

Hex.prototype.toString = function () {
  return `${this.q},${this.r},${this.s}`;
};

/* When t = 0, it's all a; when t = 1, it's all b */
export function mix (a, b, t) {
  return a * (1 - t) + b * t;
}

/* return min, max of one field of an array of objects */
export function bounds (array, field) {
  let min = Number.POSITIVE_INFINITY,
    max = Number.NEGATIVE_INFINITY;

  for (const object of array) {
    const value = object[field];

    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }
  return { min, max };
}

/* return integer sequence min <= x <= max (half-open)  */
export function closedInterval ({ min, max }) {
  const results: number[] = [];

  for (let i = min; i <= max; i++) {
    results.push(i);
  }
  return results;
}

/* For whatever reason I don't have this in the generated code! */
export function hex_equal (a, b) {
  return a.q == b.q && a.r == b.r && a.s == b.s;
}

/* Specifically for offset grid diagrams */
// export function makeRectangularShape (minCol, maxCol, minRow, maxRow, convert) {
//   const results: Hex[] = [];

//   for (let col = minCol; col <= maxCol; col++) {
//     for (let row = minRow; row <= maxRow; row++) {
//       const hex = convert(new OffsetCoord(col, row));

//       hex.col = col;
//       hex.row = row;
//       results.push(hex);
//     }
//   }
//   return results;
// }

/* Specifically for doubled grid diagrams */
// export function makeRDoubledRectangularShape (minCol, maxCol, minRow, maxRow) {
//   const results = [];

//   for (let row = minRow; row <= maxRow; row++) {
//     for (let col = minCol + (row & 1); col <= maxCol; col += 2) {
//       const hex = new DoubledCoord(col, row).rdoubledToCube();

//       hex.col = col;
//       hex.row = row;
//       results.push(hex);
//     }
//   }
//   return results;
// }

/* Specifically for doubled grid diagrams */
// export function makeQDoubledRectangularShape (minCol, maxCol, minRow, maxRow) {
//   const results = [];

//   for (let col = minCol; col <= maxCol; col++) {
//     for (let row = minRow + (col & 1); row <= maxRow; row += 2) {
//       const hex = new DoubledCoord(col, row).qdoubledToCube();

//       hex.col = col;
//       hex.row = row;
//       results.push(hex);
//     }
//   }
//   return results;
// }

export function makeHexagonalShape (N) {
  let results: Hex[] = [];

  for (let q = N; q >= -N; q--) {
    for (let r = N; r >= -N; r--) {
      const hex = new Hex(q, r, -q - r).evenRow();

      if (hex.len() <= N) {
        results.push(hex);
      }
    }
  }

  results = results.sort((a, b) => a.y * 10 + a.x - (b.y * 10 + b.x)); // TODO: refactor
  return results;
}

export function makeDownTriangularShape (N) {
  const results: Hex[] = [];

  for (let r = 0; r < N; r++) {
    for (let q = 0; q < N - r; q++) {
      results.push(new Hex(q, r, -q - r));
    }
  }
  return results;
}

export function makeUpTriangularShape (N) {
  const results: Hex[] = [];

  for (let r = 0; r < N; r++) {
    for (let q = N - r - 1; q < N; q++) {
      results.push(new Hex(q, r, -q - r));
    }
  }
  return results;
}

export function makeRhombusShape (w, h) {
  if (!h) {
    h = w;
  }
  const results: Hex[] = [];

  for (let r = 0; r < h; r++) {
    for (let q = 0; q < w; q++) {
      results.push(new Hex(q, r, -q - r));
    }
  }
  return results;
}

/* Given a set of points, return the maximum extent
   {left, right, top, bottom} */
export function pointSetBounds (points) {
  let left = Number.POSITIVE_INFINITY,
    top = Number.POSITIVE_INFINITY,
    right = Number.NEGATIVE_INFINITY,
    bottom = Number.NEGATIVE_INFINITY;

  for (const p of points) {
    if (p.x < left) {
      left = p.x;
    }
    if (p.x > right) {
      right = p.x;
    }
    if (p.y < top) {
      top = p.y;
    }
    if (p.y > bottom) {
      bottom = p.y;
    }
  }
  return { left, top, right, bottom };
}

/* Given a set of hexes, return the maximum extent
   {left, right, top, bottom} */
// export function hexSetBounds (layout, hexes) {
//   const corners = [];

//   for (let corner = 0; corner < 6; corner++) {
//     corners.push(layout.hexCornerOffset(corner));
//   }
//   const cornerBounds = pointSetBounds(corners);

//   const centerBounds = pointSetBounds(hexes.map((h) => layout.hexToPixel(h)));

//   return {
//     left: cornerBounds.left + centerBounds.left,
//     top: cornerBounds.top + centerBounds.top,
//     right: cornerBounds.right + centerBounds.right,
//     bottom: cornerBounds.bottom + centerBounds.bottom,
//   };
// }

export function breadthFirstSearch (start, blocked) {
  /* see https://www.redblobgames.com/pathfinding/a-star/introduction.html */
  const cost_so_far = {};

  cost_so_far[start] = 0;
  const came_from = {};

  came_from[start] = null;
  const fringes = [[start]];

  for (let k = 0; fringes[k].length > 0; k++) {
    fringes[k + 1] = [];
    for (const hex of fringes[k]) {
      for (let dir = 0; dir < 6; dir++) {
        const neighbor = hex.neighbor(dir);

        if (cost_so_far[neighbor] === undefined && !blocked(neighbor)) {
          cost_so_far[neighbor] = k + 1;
          came_from[neighbor] = hex;
          fringes[k + 1].push(neighbor);
        }
      }
    }
  }
  return { cost_so_far, came_from };
}

/* NOTE: this returns the *fractional* hexes between A and B; you need
   to call round() on them to get the hex tiles */
export function hexLineFractional (A, B) {
  /* see https://www.redblobgames.com/grids/line-drawing.html */

  /* HACK: add a tiny offset to the start point to break ties,
   * because there are a lot of ties on a grid, and I want it to
   * always round the same direction for consistency. To demonstrate
   * the need for this hack, draw a line from Hex(-5, 0, +5) to
   * Hex(+5, -5, 0). Without the hack, there are points on the edge
   * that will sometimes be rounded one way and sometimes the other.
   * The hack will force them to be rounded consistently. */
  const offset = new Hex(1e-6, 2e-6, -3e-6);

  const N = A.subtract(B).len();
  const results: Hex[] = [];

  for (let i = 0; i <= N; i++) {
    results.push(A.lerp(B, i / Math.max(1, N)).add(offset));
  }
  return results;
}

export function hexRing (radius) {
  const results: Hex[] = [];
  let H = Hex.direction(4).scale(radius);

  for (let side = 0; side < 6; side++) {
    for (let step = 0; step < radius; step++) {
      results.push(H);
      H = H.neighbor(side);
    }
  }
  return results;
}
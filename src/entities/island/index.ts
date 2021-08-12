import Map from '@redblobgames/mapgen2';
import Poisson from 'poisson-disk-sampling';
import DualMesh from '@redblobgames/dual-mesh';
import MeshBuilder from '@redblobgames/dual-mesh/create';
import SimplexNoise from 'simplex-noise';
import { makeRandInt } from '@redblobgames/prng';
import pointsInPolygon from 'points-in-polygon';


interface IPolygon { biome: string, vertices: [] }

export class Island {
  island: Map;

  mesh: DualMesh;

  polygons: IPolygon[];

  constructor () {
    const mesh = new DualMesh(
      new MeshBuilder()
        .addPoisson(Poisson, 20)
        .create(),
    );

    this.mesh = mesh;

    const map = new Map(mesh,
      {
        amplitude: 0.2,
        length: 4,
        seed: 12_345,
      },
      makeRandInt,
    );

    map.calculate({
      noise: new SimplexNoise(),
      shape: { round: 0.5, inflate: 0.4, amplitudes: [1/2, 1/4, 1/8, 1/16] },
      numRivers: 30,
      drainageSeed: 0,
      riverSeed: 0,
      noisyEdge: { length: 10, amplitude: 0.2, seed: 0 },
      biomeBias: { north_temperature: 0, south_temperature: 0, moisture: 0 },
    });

    this.island = map;
    const { polygons } = this.makePolygons(map);

    this.polygons = polygons;
  }

  makePolygons (map: Map) {
    const polygons: IPolygon[] = [];

    for (let r = 0; r < map.mesh.numSolidRegions; r++) {
      polygons.push({
        biome: map.r_biome[r],
        vertices: map.mesh.r_circulate_t([], r)
          .map((t) => this.mesh.t_pos([], t)),
      });
    }

    return { polygons };
  }

  _process () {
    return pointsInPolygon(this.island);
  }
} 

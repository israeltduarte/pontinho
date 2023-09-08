import { Player } from './player';
import { Settings } from './settings';

// export class Player {
//   constructor(
//     public id: string,
// public name: string,
// public total: number,
// public scape: any,
// public points: any[],
// public hasExploded: boolean,
// public explosionsLef: number,
// public isPlaying: booleanic isPlaying: boolean
//   ) {}
// }

export function newEmptyPlayer(): Player {
  return new Player('', '', 0, 0, [], false, 0, true);
}

// export function newEmptyPlayer(
//   name: string,
//   scape: number,
//   explosionsLeft: number
// ): Player {
//   return new Player('', name, 0, scape - 1, [], false, explosionsLeft, true);
// }

export function newEmptySettings(): Settings {
  return new Settings('', 99, 1);
}

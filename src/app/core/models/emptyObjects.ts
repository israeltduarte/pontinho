import { Player } from './player';

export function newEmptyPlayer(): Player {
  return new Player('', '', 0, 0, [], false, 0, 0, false);
}
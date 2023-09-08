import { Player } from './player';
import { Settings } from './settings';

export function newEmptyPlayer(): Player {
  return new Player('', '', 0, 0, [], false, 0, 0, false);
}

export function newEmptySettings(): Settings {
  return new Settings('', 99, 1);
}

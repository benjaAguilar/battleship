/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-unused-vars
import css from './styles.css';
import createGrid, { updatePlayerGrid } from './dom';
import Player from './players';

const player = new Player('benja');
const CPU = new Player('CPU');

CPU.gameboard.placeAllShips();
player.gameboard.placeAllShips();

createGrid(player.gameboard, 'player');
createGrid(CPU.gameboard, 'cpu');

export default function cpuPlay() {
  let x;
  let y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (player.gameboard.receieveAttack(y, x) === null);

  player.gameboard.receieveAttack(y, x);
  updatePlayerGrid(player);
}

/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-unused-vars
import css from './styles.css';
import createGrid, { endGame, updateGrids } from './dom';
import Player from './players';

let player;
let CPU;

export function newGame(name) {
  player = new Player(name);
  CPU = new Player('CPU');

  CPU.gameboard.placeAllShips();
  player.gameboard.placeAllShips();

  createGrid(player.gameboard, 'player');
  createGrid(CPU.gameboard, 'cpu');
}

export function areSunk(objective) {
  let obj;
  let winner;

  if (objective === 'cpu') {
    obj = CPU.gameboard.allShipsSunk();
    winner = player.name;
  } else {
    obj = player.gameboard.allShipsSunk();
    winner = CPU.name;
  }

  if (obj) endGame(winner);
}

export function cpuPlay() {
  let x;
  let y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (player.gameboard.receieveAttack(y, x) === null);

  player.gameboard.receieveAttack(y, x);
  updateGrids(CPU, document.querySelector('.cpu-container'), 'cpu');
  updateGrids(player, document.querySelector('.player-container'), 'player');
  areSunk(player);
}

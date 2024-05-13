/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-unused-vars
import css from './styles.css';
// eslint-disable-next-line no-unused-vars
import logo from './imgs/logo.png';
import createGrid, { endGame, updateGrids } from './dom';
import Player from './players';

// eslint-disable-next-line no-multi-assign
document.querySelectorAll('.logo').forEach((img) => {
  // eslint-disable-next-line no-param-reassign
  img.src = logo;
});

let player;
let CPU;

export function newGame(name) {
  player = new Player(name);
  CPU = new Player('CPU');

  createGrid(
    player.gameboard,
    'player',
    document.querySelector('#player-place'),
  );
}

export function startGame() {
  CPU.gameboard.placeAllShips();
  createGrid(
    player.gameboard,
    'player',
    document.querySelector('.player-container'),
  );
  createGrid(CPU.gameboard, 'cpu', document.querySelector('.cpu-container'));
}

export function showPlacement() {
  player.deletePlacements();
  player.gameboard.placeAllShips();
  updateGrids(player, document.querySelector('#player-place'), 'player');
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

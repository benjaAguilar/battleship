/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import { areSunk, cpuPlay, newGame } from './index';

/* eslint-disable no-shadow */
const playerGridContainer = document.querySelector('.player-container');
const cpuGridContainer = document.querySelector('.cpu-container');
const menu = document.querySelector('.menu');
const gameContent = document.querySelector('.game-content');
const playBtn = document.querySelector('.play');
const modal = document.querySelector('.results');
const wins = document.querySelector('.wins');
const rematch = document.querySelector('#rematch');

playBtn.addEventListener('mouseover', () => {
  playBtn.textContent = '~ Play ~';
});
playBtn.addEventListener('mouseout', () => {
  playBtn.textContent = 'Play';
});

playBtn.addEventListener('click', () => {
  let name = document.querySelector('#player-name').value;
  if (name === '') name = 'Player';

  document.querySelector('.p-name').textContent = name;
  newGame(name);

  menu.style.display = 'none';
  gameContent.style.display = 'grid';
});

rematch.addEventListener('click', () => {
  playerGridContainer.removeChild(playerGridContainer.firstChild);
  cpuGridContainer.removeChild(cpuGridContainer.firstChild);
  newGame();
  modal.close();
});

// updates the CPU box
function updateBox(y, x, gameboard, box) {
  const attack = gameboard.receieveAttack(y, x);
  if (attack === null) return null;

  if (gameboard.board[y][x] === 'miss')
    box.querySelector('p').textContent = 'o';

  if (gameboard.board[y][x] === 'X') {
    box.querySelector('p').textContent = 'c';
    box.classList.add('ship');
  }
  return attack;
}

// prints the player ships on screen
function printShips(y, x, gameboard, box) {
  const ship = gameboard.board[y][x];
  if (typeof ship === 'object') box.classList.add('ship');

  if (ship === 'X') {
    box.classList.add('ship');
    box.querySelector('p').textContent = 'c';
  }

  if (ship === 'miss') box.querySelector('p').textContent = 'o';
}

// creates the entire gird for player and cpu
export default function createGrid(gameboard, player) {
  const container = document.createElement('div');
  container.classList.add('board');

  let x = 0;
  let y = 0;

  for (let i = 0; i < 100; i += 1) {
    const box = document.createElement('div');
    const p = document.createElement('p');

    // if the gameboard is from the cpu add an event listener for each box
    // save the actual parameters for x and y
    if (player === 'cpu') {
      box.addEventListener(
        'click',
        ((y, x, gameboard, box) => () => {
          const attack = updateBox(y, x, gameboard, box);
          areSunk('cpu');
          if (attack !== null) cpuPlay();
        })(y, x, gameboard, box),
      );
      printShips(y, x, gameboard, box);
    }

    box.classList.add('box');
    box.appendChild(p);
    container.appendChild(box);

    // if te gameboard is from the player show his ships
    if (player === 'player') printShips(y, x, gameboard, box);

    if (x < 9) {
      x += 1;
    } else {
      x = 0;
      y += 1;
    }
  }
  if (player === 'player') playerGridContainer.appendChild(container);
  if (player === 'cpu') cpuGridContainer.appendChild(container);
}

// updates the entire player grid
export function updatePlayerGrid(player) {
  while (playerGridContainer.firstChild) {
    playerGridContainer.removeChild(playerGridContainer.firstChild);
  }

  createGrid(player.gameboard, 'player');
}

export function endGame(winner) {
  modal.showModal();
  wins.textContent = `${winner} Wins!`;
}

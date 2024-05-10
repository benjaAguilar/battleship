/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
const mainDiv = document.querySelector('.main');

function updateBox(y, x, gameboard, box) {
  console.log(`${y} ${x}`);
  gameboard.receieveAttack(y, x);
  box.textContent = gameboard.board[y][x];
}

export default function createGrid(gameboard) {
  const container = document.createElement('div');
  container.classList.add('board');
  let x = 0;
  let y = 0;
  for (let i = 0; i < 100; i += 1) {
    const box = document.createElement('div');
    box.addEventListener(
      'click',
      ((y, x, gameboard, box) => () => {
        updateBox(y, x, gameboard, box);
      })(y, x, gameboard, box),
    );
    box.textContent = gameboard.board[y][x];
    box.classList.add('box');
    container.appendChild(box);
    if (x < 9) {
      x += 1;
    } else {
      x = 0;
      y += 1;
    }
  }
  mainDiv.appendChild(container);
}

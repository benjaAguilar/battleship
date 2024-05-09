/* eslint-disable no-undef */
import Gameboard from '../gameboard';

const game = new Gameboard();
game.placeShipY(game.aircraft, 2, 4);

// can save hits on the board
test('receieve attack 1', () => {
  game.receieveAttack(2, 5);
  expect(game.board[2][5]).toBe('miss');
});

// can save hits on the ships
test('receieve attack 2', () => {
  game.receieveAttack(3, 4);
  expect(game.board[3][4]).toBe('X');
});

// can save hits on the ships
test('receieve attack 2', () => {
  game.receieveAttack(3, 4);
  expect(game.board[3][4]).toBe('X');
});

// adds hits to the ship obj
test('receieve attack (hit adder)', () => {
  expect(game.aircraft.hits).toBe('1');
});

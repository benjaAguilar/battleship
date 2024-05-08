/* eslint-disable no-undef */
import Gameboard from '../gameboard';

const gameboard = new Gameboard();

// gameboard is been created
test('gameboard', () => {
  expect(gameboard.board.length).toBe(10);
});

// can place ships
test('ship placement 1', () => {
  gameboard.placeShip(gameboard.aircraft, 2, 4);
  console.log(gameboard.board);
  expect(gameboard.board[2][4]).toBe('A');
});

test('ship placement 2', () => {
  gameboard.placeShip(gameboard.battleship, 9, 0);
  expect(gameboard.board[9][0]).toBe('B');
});

// ships extends his length on x
test('ship placement (extends ship length)', () => {
  gameboard.placeShip(gameboard.aircraft, 2, 4);
  expect(gameboard.board[2][4]).toBe('A');
  expect(gameboard.board[2][5]).toBe('A');
  expect(gameboard.board[2][6]).toBe('A');
  expect(gameboard.board[2][7]).toBe('A');
  expect(gameboard.board[2][8]).toBe('A');
});

// cannot place outside the board range
test('ship placement (board range) 1', () => {
  gameboard.placeShip(gameboard.crusier, 0, 10);
  expect(gameboard.board[0][10]).toBe(undefined);
});

test('ship placement (board range) 2', () => {
  gameboard.placeShip(gameboard.crusier, 0, 9);
  expect(gameboard.board[0][9]).toBe('w');
  expect(gameboard.board[0][10]).toBe(undefined);
});

test('ship placement (board range) 3', () => {
  gameboard.placeShip(gameboard.destroyers[0], 0, 9);
  expect(gameboard.board[0][9]).toBe('D0');
});

// cannot place ships stick to others
test('ship placement (!sticky)', () => {
  gameboard.placeShip(gameboard.submarines[0], 1, 5);
  expect(gameboard.board[1][5]).toBe('o');
  expect(gameboard.board[1][6]).toBe('o');
});

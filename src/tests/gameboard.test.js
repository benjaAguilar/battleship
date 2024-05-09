/* eslint-disable no-undef */
import Gameboard from '../gameboard';

const gameboard = new Gameboard();

// gameboard is been created
test('gameboard', () => {
  expect(gameboard.board.length).toBe(10);
});

// can place ships
test('ship placement 1', () => {
  gameboard.placeShipX(gameboard.aircraft, 2, 4);
  expect(gameboard.board[2][4]).toBe(gameboard.aircraft);
});

test('ship placement 2', () => {
  gameboard.placeShipX(gameboard.battleship, 9, 0);
  expect(gameboard.board[9][0]).toBe(gameboard.battleship);
});

// ships extends his length on x
test('ship placement (extends ship length)', () => {
  gameboard.placeShipX(gameboard.aircraft, 2, 4);
  expect(gameboard.board[2][4]).toBe(gameboard.aircraft);
  expect(gameboard.board[2][5]).toBe(gameboard.aircraft);
  expect(gameboard.board[2][6]).toBe(gameboard.aircraft);
  expect(gameboard.board[2][7]).toBe(gameboard.aircraft);
  expect(gameboard.board[2][8]).toBe(gameboard.aircraft);
});

// cannot place outside the board range
test('ship placement (board range) 1', () => {
  gameboard.placeShipX(gameboard.crusier, 0, 10);
  expect(gameboard.board[0][10]).toBe(undefined);
});

test('ship placement (board range) 2', () => {
  gameboard.placeShipX(gameboard.crusier, 0, 9);
  expect(gameboard.board[0][9]).toBe('w');
  expect(gameboard.board[0][10]).toBe(undefined);
});

test('ship placement (board range) 3', () => {
  gameboard.placeShipX(gameboard.destroyers[0], 0, 9);
  expect(gameboard.board[0][9]).toBe(gameboard.destroyers[0]);
});

// cannot place a ship in to other ship
test('ship placement (!in other ship)', () => {
  gameboard.placeShipX(gameboard.submarines[1], 2, 4);
  expect(gameboard.board[2][4]).toBe(gameboard.aircraft);
  expect(gameboard.board[2][5]).toBe(gameboard.aircraft);
});

// cannot place ships stick to others
test('ship placement (!sticky) 1', () => {
  gameboard.placeShipX(gameboard.submarines[0], 1, 5);
  expect(gameboard.board[1][5]).toBe('o');
  expect(gameboard.board[1][6]).toBe('o');
});

test('ship placement (!sticky) 2', () => {
  gameboard.placeShipX(gameboard.submarines[0], 1, 2);
  expect(gameboard.board[1][2]).toBe('w');
  expect(gameboard.board[1][3]).toBe('o');
});

// you can place ships on y position
test('ship placement Y 1', () => {
  gameboard.placeShipY(gameboard.crusier, 5, 5);
  console.log(gameboard.board);
  expect(gameboard.board[5][5]).toBe(gameboard.crusier);
  expect(gameboard.board[6][5]).toBe(gameboard.crusier);
  expect(gameboard.board[7][5]).toBe(gameboard.crusier);
});

// cannot place outside
test('ship placement Y 2', () => {
  gameboard.placeShipY(gameboard.crusier, 9, 10);
  expect(gameboard.board[9][10]).toBe(undefined);
});

// cannot place in to others
test('ship placement Y (!in other ship)', () => {
  gameboard.placeShipY(gameboard.destroyers[1], 5, 5);
  expect(gameboard.board[5][5]).not.toBe(gameboard.destroyers[1]);
});

// cannot place stick to others
test('ship placement Y (!sticky)', () => {
  gameboard.placeShipY(gameboard.destroyers[1], 9, 4);
  expect(gameboard.board[9][4]).not.toBe(gameboard.destroyers[1]);
});

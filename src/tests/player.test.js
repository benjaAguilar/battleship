/* eslint-disable no-undef */
import Player from '../players';

const player = new Player('benja');
const playerCPU = new Player('CPU');

// obj its been created
test('player obj created', () => {
  expect(player.name).toBe('benja');
});

test('player obj created', () => {
  expect(playerCPU.name).toBe('CPU');
});

// contains his gameboard
test('player obj created', () => {
  expect(player.gameboard).toBeInstanceOf(Object);
});

test('player obj created', () => {
  expect(playerCPU.gameboard).toBeInstanceOf(Object);
});

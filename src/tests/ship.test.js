/* eslint-disable no-undef */
import Ship from '../ship';

const aircraft = new Ship(5);
for (let i = 1; i <= aircraft.length - 1; i += 1) {
  aircraft.hit();
}

test('ship hit', () => {
  expect(aircraft.hits).toBe(4);
});

test('ship sunk 1', () => {
  expect(aircraft.sunk).toBe(false);
});

test('ship sunk 2', () => {
  const boat = new Ship(1);
  boat.hit();
  expect(boat.sunk).toBe(true);
});

import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = new Array(10);
    for (let i = 0; i < 10; i += 1) {
      this.board[i] = new Array(10).fill('w');
    }
    this.aircraft = new Ship(5, 'A');
    this.battleship = new Ship(4, 'B');
    this.crusier = new Ship(3, 'C');
    this.submarines = [new Ship(2, 'S0'), new Ship(2, 'S1')];
    this.destroyers = [new Ship(1, 'D0'), new Ship(1, 'D1')];
  }

  placeShipX(ship, y, x) {
    if (y > 9 || x > 9) return;
    if (x + ship.length - 1 >= 10) return;

    let hasSpace = true;
    for (let i = 0; i < ship.length; i += 1) {
      if (this.board[y][x + i] !== 'w') hasSpace = false;
    }
    if (!hasSpace) return;

    // push the ship id the number of times of his length and spread on splice
    const shipId = [];
    const ocuppiedSpace = ['o', 'o'];
    for (let i = 0; i < ship.length; i += 1) {
      shipId.push(ship.id);
      ocuppiedSpace.push('o');
    }
    this.board[y].splice(x, ship.length, ...shipId);

    let xSubstract;
    let addLength;
    if (x === 0) {
      // is on the left of the board
      xSubstract = 0;
      addLength = 1;
      ocuppiedSpace.pop();
    } else if (x + ship.length > 9) {
      // is on the right of the board
      xSubstract = 1;
      addLength = 1;
      ocuppiedSpace.pop();
    } else {
      xSubstract = 1;
      addLength = 2;
    }

    // takes the space on y of the ship (up and down)
    if (y - 1 >= 0) {
      this.board[y - 1].splice(
        x - xSubstract,
        ship.length + addLength,
        ...ocuppiedSpace,
      );
    }
    if (y + 1 <= 9) {
      this.board[y + 1].splice(
        x - xSubstract,
        ship.length + addLength,
        ...ocuppiedSpace,
      );
    }

    // takes the space on x of the ship (sides)
    if (x - 1 >= 0) {
      this.board[y][x - 1] = 'o';
    }
    if (x + ship.length <= 9) {
      this.board[y][x + ship.length] = 'o';
    }
  }
}

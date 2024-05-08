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

  placeShip(ship, y, x) {
    if (y > 9 || x > 9) return;
    if (x + ship.length - 1 >= 10) return;

    // push the ship id the number of times of his length and spread on splice
    const shipId = [];
    const ocuppiedSpace = ['o', 'o'];
    for (let i = 0; i < ship.length; i += 1) {
      shipId.push(ship.id);
      ocuppiedSpace.push('o');
    }
    this.board[y].splice(x, ship.length, ...shipId);

    // takes the space on y of the ship (up and down)
    this.board[y - 1].splice(x - 1, ship.length + 2, ...ocuppiedSpace);
    this.board[y + 1].splice(x - 1, ship.length + 2, ...ocuppiedSpace);

    // takes the space on x of the ship (sides)
    this.board[y][x - 1] = 'o';
    this.board[y][x + ship.length] = 'o';
  }
}

/* eslint-disable consistent-return */
import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = new Array(10);
    for (let i = 0; i < 10; i += 1) {
      this.board[i] = new Array(10).fill('w');
    }
    this.allSunk = false;
    this.aircraft = new Ship(5, 'A');
    this.battleship = new Ship(4, 'B');
    this.crusier = new Ship(3, 'C');
    this.submarines = [new Ship(2, 'S0'), new Ship(2, 'S1')];
    this.destroyers = [new Ship(1, 'D0'), new Ship(1, 'D1')];
  }

  allShipsSunk() {
    const ships = [
      this.aircraft,
      this.battleship,
      this.crusier,
      this.submarines[0],
      this.submarines[1],
      this.destroyers[0],
      this.destroyers[1],
    ];
    let allSunk = true;
    ships.forEach((ship) => {
      if (!ship.sunk) allSunk = false;
    });
    return allSunk;
  }

  takeSpaceY(ship, y, x, space) {
    let ySubstract;
    let addLength;
    if (y === 0) {
      // is on the top of the board
      ySubstract = 0;
      addLength = 1;
    } else if (y + ship.length > 9) {
      // is on the bottom of the board
      ySubstract = 1;
      addLength = 1;
    } else {
      ySubstract = 1;
      addLength = 2;
    }

    // takes the space on x of the ship (sides)
    if (x - 1 >= 0) {
      for (let i = 0; i < ship.length + addLength; i += 1) {
        this.board[y - ySubstract + i][x - 1] = space;
      }
    }
    if (x + 1 <= 9) {
      for (let i = 0; i < ship.length + addLength; i += 1) {
        this.board[y - ySubstract + i][x + 1] = space;
      }
    }

    // takes the space on y of the ship (up and down)
    if (y - 1 >= 0) {
      this.board[y - 1][x] = space;
    }
    if (y + ship.length <= 9) {
      this.board[y + ship.length][x] = space;
    }
  }

  takeSpaceX(ship, y, x, space) {
    let xSubstract;
    let addLength;
    if (x === 0) {
      // is on the left of the board
      xSubstract = 0;
      addLength = 1;
    } else if (x + ship.length > 9) {
      // is on the right of the board
      xSubstract = 1;
      addLength = 1;
    } else {
      xSubstract = 1;
      addLength = 2;
    }

    // takes the space on y of the ship (up and down)
    if (y - 1 >= 0) {
      for (let i = 0; i < ship.length + addLength; i += 1) {
        this.board[y - 1][x - xSubstract + i] = space;
      }
    }
    if (y + 1 <= 9) {
      for (let i = 0; i < ship.length + addLength; i += 1) {
        this.board[y + 1][x - xSubstract + i] = space;
      }
    }

    // takes the space on x of the ship (sides)
    if (x - 1 >= 0) {
      this.board[y][x - 1] = space;
    }
    if (x + ship.length <= 9) {
      this.board[y][x + ship.length] = space;
    }
  }

  showSunked(ship) {
    if (!ship.sunk) return;
    const length = ship.length - 1;

    if (
      this.board[ship.y][ship.x + length] === ship ||
      this.board[ship.y][ship.x + length] === 'X'
    )
      return this.takeSpaceX(ship, ship.y, ship.x, 'miss');

    if (
      this.board[ship.y + length][ship.x] === ship ||
      this.board[ship.y + length][ship.x] === 'X'
    );
    return this.takeSpaceY(ship, ship.y, ship.x, 'miss');
  }

  receieveAttack(y, x) {
    let attack;
    this.allSunk = this.allShipsSunk();
    if (this.allSunk) return null;

    if (this.board[y][x] === 'X' || this.board[y][x] === 'miss') return null;

    if (this.board[y][x] === 'w' || this.board[y][x] === 'o') {
      attack = 'miss';
    } else {
      attack = 'X';
      this.board[y][x].hit();
      this.showSunked(this.board[y][x]);
    }
    this.board[y][x] = attack;
  }

  placeShipY(ship, y, x) {
    if (y > 9 || x > 9) return;
    if (y + ship.length - 1 >= 10) return;

    let hasSpace = true;
    for (let i = 0; i < ship.length; i += 1) {
      if (this.board[y + i][x] !== 'w') hasSpace = false;
    }
    if (!hasSpace) return;

    for (let i = 0; i < ship.length; i += 1) {
      this.board[y + i][x] = ship;
    }
    ship.saveInitialPos(y, x);

    this.takeSpaceY(ship, y, x, 'o');
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
    for (let i = 0; i < ship.length; i += 1) {
      shipId.push(ship);
    }
    this.board[y].splice(x, ship.length, ...shipId);
    ship.saveInitialPos(y, x);

    this.takeSpaceX(ship, y, x, 'o');
  }

  randomPos(ship) {
    const verticalOrHorizontal = Math.floor(Math.random() * 2);
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);

    if (verticalOrHorizontal === 0) this.placeShipX(ship, y, x);
    if (verticalOrHorizontal === 1) this.placeShipY(ship, y, x);

    if (this.board[y][x] !== ship) this.randomPos(ship);
  }

  placeAllShips() {
    const ships = [
      this.aircraft,
      this.battleship,
      this.crusier,
      this.submarines[0],
      this.submarines[1],
      this.destroyers[0],
      this.destroyers[1],
    ];
    ships.forEach((ship) => this.randomPos(ship));
  }
}

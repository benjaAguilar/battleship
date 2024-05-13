export default class Ship {
  constructor(length, id) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.id = id;
    this.x = null;
    this.y = null;
  }

  hit() {
    this.hits += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.length === this.hits) {
      this.sunk = true;
    }
  }

  saveInitialPos(y, x) {
    this.y = y;
    this.x = x;
  }
}

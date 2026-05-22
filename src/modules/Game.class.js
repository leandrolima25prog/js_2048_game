'use strict';

class Game {
  constructor(initialState) {
    this.state = initialState || this.createBoard();
    this.score = 0;
    this.status = 'idle';
  }

  createBoard() {
    return Array.from({ length: 4 }, () =>
      Array(4).fill(0),
    );
  }

  start() {
    this.state = this.createBoard();
    this.score = 0;
    this.status = 'playing';
  }

  restart() {
    this.start();
  }

  getState() {
    return this.state;
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }
}
window.Game = Game;

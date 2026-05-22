'use strict';

class Game {
  constructor(initialState) {
    this.state =
      initialState || this.createBoard();

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

    this.addRandomTile();
    this.addRandomTile();
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

  // ======================
  // MOVES CORE
  // ======================

  moveLeft() {
    if (this.status !== 'playing') return;

    let changed = false;
    let gained = 0;

    const newState = this.state.map((row) => {
      const result = this.processRow(row);
      if (JSON.stringify(result.row) !== JSON.stringify(row)) {
        changed = true;
      }
      gained += result.score;
      return result.row;
    });

    if (changed) {
      this.state = newState;
      this.score += gained;
      this.afterMove();
    }
  }

  moveRight() {
    this.state = this.state.map((r) => r.reverse());
    this.moveLeft();
    this.state = this.state.map((r) => r.reverse());
  }

  moveUp() {
    this.transpose();
    this.moveLeft();
    this.transpose();
  }

  moveDown() {
    this.transpose();
    this.moveRight();
    this.transpose();
  }

  // ======================
  // LOGIC ROW
  // ======================

  processRow(row) {
    let arr = row.filter((v) => v !== 0);
    let score = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score += arr[i];
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((v) => v !== 0);

    while (arr.length < 4) {
      arr.push(0);
    }

    return { row: arr, score };
  }

  // ======================
  // AFTER MOVE
  // ======================

  afterMove() {
    this.addRandomTile();
    this.checkStatus();
  }

  // ======================
  // RANDOM TILE
  // ======================

  addRandomTile() {
    const empty = [];

    this.state.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) empty.push([i, j]);
      });
    });

    if (!empty.length) return;

    const [i, j] =
      empty[Math.floor(Math.random() * empty.length)];

    this.state[i][j] =
      Math.random() < 0.1 ? 4 : 2;
  }

  // ======================
  // STATUS
  // ======================

  checkStatus() {
    if (this.has2048()) {
      this.status = 'win';
      return;
    }

    if (!this.canMove()) {
      this.status = 'lose';
      return;
    }

    this.status = 'playing';
  }

  has2048() {
    return this.state.flat().includes(2048);
  }

  canMove() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cur = this.state[i][j];

        if (cur === 0) return true;

        if (
          j < 3 &&
          cur === this.state[i][j + 1]
        )
          return true;

        if (
          i < 3 &&
          cur === this.state[i + 1][j]
        )
          return true;
      }
    }

    return false;
  }

  // ======================
  // HELPERS
  // ======================

  transpose() {
    const newBoard = this.createBoard();

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newBoard[j][i] = this.state[i][j];
      }
    }

    this.state = newBoard;
  }
}

// 👇 ESSENCIAL
window.Game = Game;

'use strict';

const Game = require('../modules/Game.class');

// =======================
// ELEMENTOS DO DOM
// =======================
const scoreEl = document.querySelector('.game-score');
const startBtn = document.querySelector('.button');
const cells = document.querySelectorAll('.field-cell');

const messageStart = document.querySelector('.message-start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');

// =======================
// JOGO
// =======================
const game = new Game();

// =======================
// RENDERIZA TABULEIRO
// =======================
function render() {
  const state = game.getState();

  const flat = state.flat();

  cells.forEach((cell, i) => {
    const value = flat[i];

    // limpa classes antigas
    cell.className = 'field-cell';

    if (value) {
      cell.textContent = value;
      cell.classList.add(`field-cell--${value}`);
    } else {
      cell.textContent = '';
    }
  });

  scoreEl.textContent = game.getScore();

  updateMessages();
}

// =======================
// MENSAGENS
// =======================
function updateMessages() {
  const gameStatus = game.getStatus();

  messageStart.classList.add('hidden');
  messageWin.classList.add('hidden');
  messageLose.classList.add('hidden');

  if (gameStatus === 'idle') {
    messageStart.classList.remove('hidden');
  }

  if (gameStatus === 'win') {
    messageWin.classList.remove('hidden');
  }

  if (gameStatus === 'lose') {
    messageLose.classList.remove('hidden');
  }
}

// =======================
// START / RESTART BOTÃO
// =======================
startBtn.addEventListener('click', () => {
  const gameStatus = game.getStatus();

  if (status === 'idle') {
    game.start();
    startBtn.textContent = 'Restart';
    startBtn.classList.remove('start');
    startBtn.classList.add('restart');
  } else {
    game.restart();
  }

  render();
});

// =======================
// TECLADO
// =======================
document.addEventListener('keydown', (e) => {
  const gameStatus = game.getStatus();

  if (gameStatus !== 'playing') {
    return;

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  render();
};

// =======================
// INICIAL
// =======================
render();

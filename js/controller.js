'use strict';
import { resetCells, stopTime } from './functionality.js';
import { move } from './moves.js';
import { btnReset, res } from './selector.js';

// RESET BUTTON
btnReset.addEventListener('click', function (e) {
  e.preventDefault();
  res.forEach(e => e.classList.remove('game__win'));
  stopTime();
  resetCells();

  document.getElementById('moves').innerHTML = 0;
  move();
});

// LOADS HIGHSCORES ON PAGE LOAD
window.addEventListener('load', function () {
  const highScoreHTML = document.querySelector('.highscore__scores');
  const highscoreList = JSON.parse(localStorage.getItem('highscores'));
  if (!highscoreList) return;
  for (let i = 0; i < highscoreList.length; i++) {
    let minute = Math.floor(highscoreList[i] / 60);
    let second = highscoreList[i] % 60;
    const html = `<div class="highscore__score">${
      minute > 0 ? minute + ' min, ' : ''
    }${second} sec</div>`;
    highScoreHTML.insertAdjacentHTML('beforeend', html);
  }
});

// Initialising
const init = function () {
  move();
  resetCells();
};
init();

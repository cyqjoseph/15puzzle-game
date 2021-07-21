'use strict';
import { resetCells } from './functionality.js';
import { move } from './moves.js';
import { btnReset, res } from './selector.js';

// RESET BUTTON
btnReset.addEventListener('click', function (e) {
  e.preventDefault();
  res.forEach(e => e.classList.remove('game__win'));
  resetCells();
  document.getElementById('moves').innerHTML = 0;
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

// localStorage.setItem('highscores', JSON.stringify(['2min4sec', '2min3sec'])); // Must be a list
// const highscores = localStorage.getItem('highscores');
// console.log(JSON.parse(highscores)); // returns an array

// console.log(highscores); // returns a string

////////////////////////////////////
// APPLICATION ARCHITECTURE

// class Game extends Moves {
//   constructor() {
//     super();
//     // Reset Game
//     this._resetCells();
//     this._checkWin();
//   }

//   _resetCells() {}
//   _checkWin() {}
// }

// const res = document.querySelectorAll('.game__cell');
// for (let i = 0; i < res.length; i++) {
//   if (res[i].innerHTML == '&nbsp;') {
//     emptyCell = res[i];
//   }
// }

// res.forEach(e => (e.style.backgroundColor = 'green'));

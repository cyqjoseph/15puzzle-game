import {
  sortedArr,
  evenRowCells,
  oddRowCells,
  htmlCollection,
} from './selector.js';

// GAME LOGIC CHECK TO SEE IF POSITION IS SOLVABLE
const checkInversions = function (arr) {
  let cnt = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 14; j > 0; j--) {
      if (arr[i] > arr[j] && j > i) {
        cnt++;
      } else if (j <= i) {
        break;
      }
    }
  }
  return cnt;
};

const shuffleNumbers = function (arr) {
  return arr
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);
};

const getEmptyCellIndex = function (arr) {
  return arr[Math.floor(Math.random() * 8)];
};

const shuffleCells = function () {
  const shuffled = shuffleNumbers(sortedArr);
  const inversionCount = checkInversions(shuffled);
  if (inversionCount % 2) {
    shuffled.splice(getEmptyCellIndex(evenRowCells), 0, '&nbsp;');
  } else {
    shuffled.splice(getEmptyCellIndex(oddRowCells), 0, '&nbsp;');
  }
  return shuffled;
};

// TIMER
let second = 0;
let minute = 0;
export const timer = function () {
  if (second === 60) {
    second = 0;
    minute++;
    document.querySelectorAll('.text__time-minute')[0].innerHTML = minute;
  }
  document.getElementById('second').innerHTML = second;
  second++;
};

//RESET TIMER

export const resetTime = function () {
  let timeElapsed = setInterval(timer, 1000);
  second = 0;
  minute = 0;
  document.getElementById('minute').innerHTML = 0;
  document.getElementById('second').innerHTML = 0;

  timeElapsed = setInterval(timeElapsed);
};

// RESET GAME
export const resetCells = function () {
  const shuffledCells = shuffleCells();
  for (let i = 0; i < 16; i++) {
    htmlCollection[i].innerHTML = shuffledCells[i];
  }

  resetTime();
};

// STOP TIME ON GAME WIN
export const stopTime = function () {
  const highestTimeoutId = setTimeout(';');
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
  return;
};

// CHECKS HIGHSCORES
export const checkHighscore = function (totalTime) {
  if (!localStorage.length) localStorage.setItem('highscores', '[]');
  const highscoreList = JSON.parse(localStorage.getItem('highscores')); // returns highscorelist, an array
  highscoreList.push(totalTime);
  highscoreList.sort();

  if (highscoreList.length > 10) {
    highscoreList.pop();
  }

  return highscoreList;
};
// ADDS HIGHSCORES
export const addHighScore = function (totalTime) {
  const highScoreHTML = document.querySelector('.highscore__scores');
  highScoreHTML.innerHTML = '';
  const highscoreList = checkHighscore(totalTime);

  for (let i = 0; i < highscoreList.length; i++) {
    let minute = Math.floor(highscoreList[i] / 60);
    let second = highscoreList[i] % 60;
    const html = `<div class="highscore__score">${
      minute > 0 ? minute + ' min, ' : ''
    }${second} sec</div>`;
    highScoreHTML.insertAdjacentHTML('beforeend', html);
  }
  localStorage.setItem('highscores', JSON.stringify(highscoreList));
};

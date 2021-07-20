import {
  sortedArr,
  evenRowCells,
  oddRowCells,
  htmlCollection,
} from './selector.js';
// RESETTING THE GAME

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
// let arr = [13, 2, 10, 3, 1, 12, 8, 4, 5, 9, 6, 15, 14, 11, 7];
// let arr1 = [6, 13, 7, 10, 8, 9, 11, 15, 2, 12, 5, 14, 3, 1, 4];
// let arr2 = [3, 9, 1, 15, 14, 11, 4, 6, 13, 10, 12, 2, 7, 8, 5];

// console.log(checkInversions(arr));
// console.log(checkInversions(arr1));
// console.log(checkInversions(arr2));

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

    // document
    //   .querySelectorAll('.text__time-minute')
    //   .forEach(e => e.classList.remove('hidden'));
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

export const stopTime = function () {
  const highestTimeoutId = setTimeout(';');
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
  return;
};

export const checkHighscore = function (totalTime) {
  if (!localStorage.length) localStorage.setItem('highscores', '[]');
  const highscoreList = JSON.parse(localStorage.getItem('highscores')); // returns highscorelist, an array
  highscoreList.push(totalTime);
  highscoreList.sort();

  if (highscoreList.length > 10) {
    highscoreList.pop();
  }
  // localStorage.setItem('highscores', JSON.stringify(highscoreList)); // Must be a list
  // highscoreList = JSON.parse(localStorage.getItem('highscores'));
  // console.log(highscores); // returns a string
  return highscoreList;
};

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

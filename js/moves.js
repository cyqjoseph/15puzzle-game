import { stopTime, addHighScore } from './functionality.js';

const getGridElementsPosition = function (index) {
  const gridEl = document.querySelector('.game');
  // our indexes are zero-based but gridColumns are 1-based, so subtract 1
  let offset =
    Number(window.getComputedStyle(gridEl.children[0]).gridColumnStart) - 1;
  // if we haven't specified the first child's grid column, then there is no offset
  if (isNaN(offset)) {
    offset = 0;
  }
  const colCount = window
    .getComputedStyle(gridEl) //will return pixel lengths
    .gridTemplateColumns.split(' ').length; // will be 4

  const rowPosition = Math.floor((index + offset) / colCount);
  const colPosition = (index + offset) % colCount;

  //Return an object with properties row and column
  return { row: rowPosition, column: colPosition };
};

const getNodeIndex = function (elm) {
  let c = elm.parentNode.children,
    i = 0;
  for (; i < c.length; i++) if (c[i] == elm) return i;
};

// For Testing purposes, returns index of grid when clicked
const addClickEventsToGridItems = function () {
  let gridItems = document.getElementsByClassName('game__cell'); //gridItem is an HTML collection

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].onclick = e => {
      console.log(e.target);
      let position = getGridElementsPosition(getNodeIndex(e.target));
      console.log(
        `Node position is row ${position.row}, column ${position.column}`
      );
      return position;
    };
  }
};
// addClickEventsToGridItems();

// returns current Empty cell
const getEmptyCell = function () {
  let emptyCell;
  const res = document.querySelectorAll('.game__cell');
  for (let i = 0; i < res.length; i++) {
    if (res[i].innerHTML == '&nbsp;') {
      emptyCell = res[i];
    }
  }
  return emptyCell;
};

// returns current empty cell index
const getEmptyCellLocation = function () {
  let emptyCell = getEmptyCell();
  // emptyCell equivalent to document.querySelectorAll(".game__cell.cell-16")[0];
  const { row, column } = getGridElementsPosition(getNodeIndex(emptyCell));
  return [row, column];
};

// returns cell on top of current empty cell
const checkCellOnTop = function () {
  const [row, column] = getEmptyCellLocation();
  if (row === 0) return;
  const newRow = row - 1;
  const index = newRow * 4 + column;

  return document.getElementsByClassName('game__cell')[index];
};

const checkCellOnBottom = function () {
  const [row, column] = getEmptyCellLocation();
  if (row === 3) return;
  const newRow = row + 1;
  const index = newRow * 4 + column;

  return document.getElementsByClassName('game__cell')[index];
};

const checkCellOnLeft = function () {
  const [row, column] = getEmptyCellLocation();
  if (column === 0) return;
  const newColumn = column - 1;
  const index = row * 4 + newColumn;

  return document.getElementsByClassName('game__cell')[index];
};

const checkCellOnRight = function () {
  const [row, column] = getEmptyCellLocation();
  if (column === 3) return;
  const newColumn = column + 1;
  const index = row * 4 + newColumn;

  return document.getElementsByClassName('game__cell')[index];
};

const settleWin = function () {
  document.removeEventListener('keydown', keydown);
};
const checkWin = function () {
  const res = document.querySelectorAll('.game__cell');
  for (let i = 0; i < res.length - 1; i++) {
    if (Math.abs(res[i].classList.value.slice(-2)) !== +res[i].innerHTML) {
      return;
    }
  }
  res.forEach(e => e.classList.add('game__win'));
  const totalMin = +document.getElementById('minute').innerHTML;
  const totalSec = +document.getElementById('second').innerHTML;
  const totalTime = +totalMin * 60 + totalSec;
  stopTime();
  settleWin();
  addHighScore(totalTime);
};

let moveCounter = 0;
const keydown = function (e) {
  try {
    let topCell = checkCellOnTop();
    let bottomCell = checkCellOnBottom();
    let leftCell = checkCellOnLeft();
    let rightCell = checkCellOnRight();
    let emptyCell = getEmptyCell();
    if (e.key === 'ArrowDown') {
      [topCell.innerHTML, emptyCell.innerHTML] = [
        emptyCell.innerHTML,
        topCell.innerHTML,
      ];
    } else if (e.key === 'ArrowUp') {
      [bottomCell.innerHTML, emptyCell.innerHTML] = [
        emptyCell.innerHTML,
        bottomCell.innerHTML,
      ];
    } else if (e.key === 'ArrowRight') {
      [leftCell.innerHTML, emptyCell.innerHTML] = [
        emptyCell.innerHTML,
        leftCell.innerHTML,
      ];
    } else if (e.key === 'ArrowLeft') {
      [rightCell.innerHTML, emptyCell.innerHTML] = [
        emptyCell.innerHTML,
        rightCell.innerHTML,
      ];
    }
    // Increase Move Count
    moveCounter++;
    document.getElementById('moves').innerHTML = moveCounter;
    // Check For win after every move
    checkWin();
  } catch (e) {
    function stopError() {
      return true;
    }
  }
};

export const move = function () {
  document.addEventListener('keydown', keydown);
};

// class Moves {
//   constructor() {}
//   // Get row and columns of the cell
//   _getGridElementsPosition(index) {
//     const gridEl = document.querySelector('.game');
//     // our indexes are zero-based but gridColumns are 1-based, so subtract 1
//     let offset =
//       Number(window.getComputedStyle(gridEl.children[0]).gridColumnStart) - 1;
//     // if we haven't specified the first child's grid column, then there is no offset
//     if (isNaN(offset)) {
//       offset = 0;
//     }
//     const colCount = window
//       .getComputedStyle(gridEl) //will return pixel lengths
//       .gridTemplateColumns.split(' ').length; // will be 4

//     const rowPosition = Math.floor((index + offset) / colCount);
//     const colPosition = (index + offset) % colCount;

//     //Return an object with properties row and column
//     return { row: rowPosition, column: colPosition };
//   }

//   _getNodeIndex(elm) {
//     let c = elm.parentNode.children,
//       i = 0;
//     for (; i < c.length; i++) if (c[i] == elm) return i;
//   }

//   // For Testing purposes, returns index of grid when clicked
//   _addClickEventsToGridItems() {
//     let gridItems = document.getElementsByClassName('game__cell'); //gridItem is an HTML collection

//     for (let i = 0; i < gridItems.length; i++) {
//       gridItems[i].onclick = e => {
//         console.log(e.target);
//         let position = this._getGridElementsPosition(
//           this._getNodeIndex(e.target)
//         );
//         console.log(
//           `Node position is row ${position.row}, column ${position.column}`
//         );
//         return position;
//       };
//     }
//   }
//   // addClickEventsToGridItems();

//   // returns current Empty cell
//   _getEmptyCell() {
//     let emptyCell;
//     const res = document.querySelectorAll('.game__cell');
//     for (let i = 0; i < res.length; i++) {
//       if (res[i].innerHTML == '&nbsp;') {
//         emptyCell = res[i];
//       }
//     }
//     return emptyCell;
//   }

//   // returns current empty cell index
//   _getEmptyCellLocation() {
//     let emptyCell = this._getEmptyCell();
//     // emptyCell equivalent to document.querySelectorAll(".game__cell.cell-16")[0];
//     const { row, column } = this._getGridElementsPosition(
//       this._getNodeIndex(emptyCell)
//     );
//     return [row, column];
//   }

//   // returns cell on top of current empty cell
//   _checkCellOnTop() {
//     const [row, column] = this._getEmptyCellLocation();
//     if (row === 0) return;
//     const newRow = row - 1;
//     const index = newRow * 4 + column;

//     return document.getElementsByClassName('game__cell')[index];
//   }

//   _checkCellOnBottom() {
//     const [row, column] = this._getEmptyCellLocation();
//     if (row === 3) return;
//     const newRow = row + 1;
//     const index = newRow * 4 + column;

//     return document.getElementsByClassName('game__cell')[index];
//   }

//   _checkCellOnLeft() {
//     const [row, column] = this._getEmptyCellLocation();
//     if (column === 0) return;
//     const newColumn = column - 1;
//     const index = row * 4 + newColumn;

//     return document.getElementsByClassName('game__cell')[index];
//   }

//   _checkCellOnRight() {
//     const [row, column] = this._getEmptyCellLocation();
//     if (column === 3) return;
//     const newColumn = column + 1;
//     const index = row * 4 + newColumn;

//     return document.getElementsByClassName('game__cell')[index];
//   }
//   _move() {
//     document.addEventListener('keydown', function (e) {
//       let topCell = this._checkCellOnTop();
//       let bottomCell = this._checkCellOnBottom();
//       let leftCell = this._checkCellOnLeft();
//       let rightCell = this._checkCellOnRight();
//       let emptyCell = this._getEmptyCell();
//       if (e.key === 'ArrowDown') {
//         [topCell.innerHTML, emptyCell.innerHTML] = [
//           emptyCell.innerHTML,
//           topCell.innerHTML,
//         ];
//       } else if (e.key === 'ArrowUp') {
//         [bottomCell.innerHTML, emptyCell.innerHTML] = [
//           emptyCell.innerHTML,
//           bottomCell.innerHTML,
//         ];
//       } else if (e.key === 'ArrowRight') {
//         [leftCell.innerHTML, emptyCell.innerHTML] = [
//           emptyCell.innerHTML,
//           leftCell.innerHTML,
//         ];
//       } else if (e.key === 'ArrowLeft') {
//         [rightCell.innerHTML, emptyCell.innerHTML] = [
//           emptyCell.innerHTML,
//           rightCell.innerHTML,
//         ];
//       }
//       //   } catch (e) {
//       //     function stopError() {
//       //       return true;
//       //     }
//       //   }
//     });
//   }
// }

// export default new Moves();

import React, {Component} from 'react';
import {connect} from 'react-redux';

const Board = ({board}) => {
    return(
      <div id="board">
        <div className="cells">
          {board.map((cell) => {
            return <div className="cell"
                        data-type={cell.type}
                        onClick={e => guess(e, cell.id, board)}
                   >{cell.code}</div>
          })}
        </div>
      </div>
    );
}

const guess = (e, id, board) => {
  const type = e.target.attributes.getNamedItem('data-type').value;
  console.log(type);

  if(type === 'mine') {
    console.log('GAME OVER!');
  }

  // CHECK N , NE, E, SE, S, SW, W for bombs
  // NW, N, NE => id-10, id-9, id-8
  // W, E      => id-1, id+1
  // SW, S, SW => id+8, id+9, id+10

  const mineCount = findAdjacentMines(id, board);

  if(mineCount === 0) {

  } else {
    e.target.textContent = mineCount;
  }
};

const findAdjacentMines = (id, board) => {
  let total   = 0,
      diffs = validDiffs(id);
  console.log(diffs);
  for(let diff of diffs) {
    let cell = board[id+diff-1];

    console.log(id, cell);
    if(cell && cell.type === 'mine') {
      total++;
    }
  }

  return total;
};

const validDiffs = (id) => {
  let diffs = [-10, -9, -8, -1, 1, 8, 9, 10];

  // Top Left Corner
  if(id === 1) {
    diffs[0] = null;
    diffs[1] = null;
    diffs[2] = null;
    diffs[3] = null;
    diffs[5] = null;
  }

  // Top Right Corner
  if(id === 9) {
    diffs[0] = null;
    diffs[1] = null;
    diffs[2] = null;
    diffs[4] = null;
    diffs[7] = null;
  }

  if(id === 73) {
    diffs[0] = null;
    diffs[3] = null;
    diffs[5] = null;
    diffs[6] = null;
    diffs[7] = null;
  }

  // Bottom Right Corner
  if(id === 81) {
    diffs[2] = null;
    diffs[4] = null;
    diffs[5] = null;
    diffs[6] = null;
    diffs[7] = null;
  }

  // Left side
  if([1,10,19,28,37, 46, 55, 64, 73].includes(id)) {
    diffs[3] = null;
  }

  // Right Side
  if(id % 9 === 0) {
    diffs[4] = null;
  }

  return diffs.filter(d => d !== null);
}

const mapStateToProps = state => ({
  board: state.board
});

export default connect(mapStateToProps)(Board);
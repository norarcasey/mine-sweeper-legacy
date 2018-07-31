import React, {Component} from 'react';
import {connect} from 'react-redux';
import {revealAdjacent, findAdjacentMines, validDiffs} from '../helpers/board-helpers';

const Board = ({board}) => {
  return(
    <div id="board">
      <div className="cells">
        {board.map((cell) => {
          return <div
                      id={`CellId-${cell.id}`}
                      className={`cell ${cell.type}`}
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
    document.querySelectorAll('.cells .cell').forEach(cell => cell.style.backgroundColor = '#fff');
    const mines = document.querySelectorAll('.cells .cell.mine');
    mines.forEach(cell => {cell.style.backgroundColor = 'red'; cell.style.color = '#fff'});
    return;
  }

  const mineCount = findAdjacentMines(id, board);

  if(mineCount === 0) {
    // find and active all the adjacent elements
    revealAdjacent(id, validDiffs(id), board);
  }
};

const mapStateToProps = state => ({
  board: state.board
});

export default connect(mapStateToProps)(Board);
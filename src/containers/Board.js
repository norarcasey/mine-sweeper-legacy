import React, {Component} from 'react';
import {connect} from 'react-redux';
import {revealAdjacent, findAdjacentMines, validDiffs} from '../helpers/board-helpers';

class Board extends Component {

  componentDidMount() {
    document.getElementById('board').addEventListener('click', this.guess);
  }

  componentWillUnmount() {
    document.getElementById('board').removeEventListener('click', this.guess);
  }

  guess = (e) => {
    const board = this.props.board,
          id = Number(e.target.getAttribute('data-id')),
          type = e.target.attributes.getNamedItem('data-type').value;

    if(type === 'mine') {
      console.log('GAME OVER!');
      document.querySelectorAll('.cells .cell').forEach(cell => cell.style.backgroundColor = '#fff');
      const mines = document.querySelectorAll('.cells .cell.mine');
      mines.forEach(cell => {cell.style.backgroundColor = 'red'; cell.style.color = '#fff'});
      return;
    }

    const mineCount = findAdjacentMines(id, board);

    if(mineCount === 0) {
      // find and activate all the adjacent elements
      revealAdjacent(id, validDiffs(id), board);
    }
  };

  render() {
    const board = this.props.board;
    return(
      <div id="board">
        <div className="cells">
          {board.map((cell, idx) => {
            return <div
                        key={idx}
                        id={`CellId-${cell.id}`}
                        data-id={cell.id}
                        className={`cell ${cell.type}`}
                        data-type={cell.type}
                    >{cell.code}</div>
          })}
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  board: state.board
});

export default connect(mapStateToProps)(Board);
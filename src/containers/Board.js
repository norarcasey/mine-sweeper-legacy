import React, {Component} from 'react';
import {connect} from 'react-redux';
import {revealAdjacent, findAdjacentMines, validDiffs} from '../helpers/board-helpers';

class Board extends Component {

  constructor() {
    super();

    this.state = {
      flagged: {}
    }

    this.flag = this.flag.bind(this);
  }

  componentDidMount() {
    // Left click
    document.getElementById('board').addEventListener('click', this.guess, false);
    // Right click
    document.getElementById('board').addEventListener('contextmenu', this.flag, false);
  }

  componentWillUnmount() {
    // Left click
    document.getElementById('board').removeEventListener('click', this.guess, false);
    // Right click
    document.getElementById('board').removeEventListener('contextmenu', this.flag, false);
  }

  flag(e) {
    e.preventDefault();
    const el = e.target,
          id = Number(el.getAttribute('data-id')),
          idObj = {};

    if(el.className.indexOf('revealed') > -1)
      return;

    if(el.className.indexOf('flag') > -1) {
      idObj[id] = false;
      el.className = el.className.replace(' flag', '');
    } else {
      idObj[id] = true;
      el.className += ' flag';
    }

    this.setState({flagged: {...this.state.flagged, ...idObj}});

    // Check if flagged all correct mines
    console.log(this.props.mines);
    console.log(Object.keys(this.state.flagged).filter(k => this.state.flagged[k] === true));

    const flaggedMines = Object.keys(this.state.flagged).filter(k => this.state.flagged[k] === true);

    if(this.props.mines.length === flaggedMines.length) {
      console.log("All the mines flagged?");
      let isWinner = true;
      for(let i=0; i < flaggedMines.length; i++) {
        if(flaggedMines[i] !== this.props.mines[i]) {
          isWinner = false;
        }
      }

      if(isWinner) {
        console.log("You WIN!");
        const blanks = document.querySelectorAll('.cells .cell.blank');
        blanks.forEach(cell => { cell.style.backgroundColor = '#ff'; });
      }

    }
  }

  guess = (e) => {
    if(e.target.className.indexOf('revealed') > -1) return;

    const board = this.props.board,
          id = Number(e.target.getAttribute('data-id')),
          type = e.target.attributes.getNamedItem('data-type').value;

    if(this.state.flagged[id]) {
      return;
    }

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
                    ></div>
          })}
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  board: state.board,
  mines: state.mines
});

export default connect(mapStateToProps)(Board);
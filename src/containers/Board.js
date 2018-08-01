import React, {Component} from 'react';
import {connect} from 'react-redux';
import {revealAdjacent, findAdjacentMines, validDiffs, revealStyle} from '../helpers/board-helpers';

class Board extends Component {

  constructor() {
    super();

    this.state = {
      flagged: {},
      isGameOver: false
    }

    this.flag = this.flag.bind(this);
  }

  flag(e) {
    e.preventDefault();

    if(this.state.isGameOver) return;

    const el = e.target.nodeName === 'I' ? e.target.parentNode : e.target,
          id = Number(el.getAttribute('data-id')),
          idObj = {};

    if(el.className.indexOf('revealed') > -1)
      return;

    if(el.className.indexOf('flag') > -1) {
      idObj[id] = false;
      el.className = el.className.replace(' flag', '');
      for(let i=0; i<el.childNodes.length; i++) {
        if(el.childNodes[i].className.indexOf('fa-flag') > -1) {
          el.childNodes[i].remove();
          break;
        }
      }
    } else {
      idObj[id] = true;
      el.className += ' flag';
      var flagNode = document.createElement("I");
      flagNode.className = 'far fa-flag';
      el.appendChild(flagNode);
    }

    this.setState({flagged: {...this.state.flagged, ...idObj}}, this.checkForWinner);

  }

  checkForWinner() {
    let self = this;
    console.log(self.props.mines);
    console.log(Object.keys(self.state.flagged).filter(k => self.state.flagged[k] === true));

    const flaggedMines = Object.keys(self.state.flagged).filter(k => self.state.flagged[k] === true);

    if(self.props.mines.length === flaggedMines.length) {
      console.log("All the mines flagged?");
      let isWinner = true;
      for(let i=0; i < flaggedMines.length; i++) {
        if(flaggedMines[i] !== self.props.mines[i]) {
          isWinner = false;
        }
      }

      if(isWinner) {
        console.log("You WIN!");
        this.setState({isGameOver: true});
        const blanks = document.querySelectorAll('.cells .cell.blank');
        blanks.forEach(cell => { revealStyle(Number(cell.getAttribute('data-id'))) });
      }
    }
  }

  guess = (e) => {
    if(this.state.isGameOver) return;

    const el = e.target;
    if(el.id === 'board' || el.className.indexOf('revealed') > -1) return;

    const board = this.props.board,
          id = Number(el.getAttribute('data-id')),
          type = el.attributes.getNamedItem('data-type').value;

    if(this.state.flagged[id]) {
      return;
    }

    if(type === 'mine') {
      console.log('GAME OVER!');
      this.setState({isGameOver: true});

      const flags = document.querySelectorAll('.fa-flag');
      flags.forEach(f => f.style.display = 'none');
      const mineCells = document.querySelectorAll('.cells .cell.mine');
      mineCells.forEach(cell => {cell.className += ' revealed';});
      const mines = document.querySelectorAll('.cells .cell.mine .fa-bomb');
      e.target.style.backgroundColor = 'red';

      mines.forEach(cell => {cell.style.display = 'inline';});
      return;
    }

    const mineCount = findAdjacentMines(id, board);

    if(mineCount === 0) {
      // find and activate all the adjacent elements
      revealStyle(id);
      revealAdjacent(id, validDiffs(id), board);
    }
  };

  render() {
    const board = this.props.board;
    return(
      <div id="board" onClick={this.guess} onContextMenu={this.flag}>
        <div className="cells">
          {board.map((cell, idx) => {
            return <div
                        key={idx}
                        id={`CellId-${cell.id}`}
                        data-id={cell.id}
                        className={`cell ${cell.type}`}
                        data-type={cell.type}
                    >{cell.type === 'mine' ? <i className="fas fa-bomb"></i> : ''}</div>
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
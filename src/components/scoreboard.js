import React from 'react';

const ScoreBoard = ({ mines, flaggedMines, time }) => {

    return (
        <div className="scoreboard">
          <div className="minesLeft">
            {mines.length - Object.keys(flaggedMines).length}
          </div>
          <div className="timer">{time}</div>
        </div>
    )
}

export default ScoreBoard;
import React from 'react';

const ScoreBoard = ({ mines, flagged, time }) => {
  const flaggedMines = Object.keys(flagged).filter(k => flagged[k] === true)

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
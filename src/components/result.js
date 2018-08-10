import React from 'react';

const Result = ({isGameOver, isWinner}) => {

  return (
    <p className={isWinner ? 'results winner' : 'results loser'}>
      { isGameOver && isWinner ? 'You Win!' : ''}
      { isGameOver && isWinner !== null && !isWinner ? 'You Lose!' : ''}
    </p>
  );
}

export default Result;
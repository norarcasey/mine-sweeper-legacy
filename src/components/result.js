import React from 'react';
import {connect} from 'react-redux';

const Result = ({isGameOver, isWinner}) => {

  return (
    <p className={isWinner ? 'results winner' : 'results loser'}>
      { isGameOver && isWinner ? 'You Win!' : ''}
      { isGameOver && isWinner !== null && !isWinner ? 'You Lose!' : ''}
    </p>
  );
}

const mapStateToProps = state => ({
    isGameOver: state.isGameOver,
    isWinner: state.isWinner
});

export default connect(mapStateToProps)(Result);
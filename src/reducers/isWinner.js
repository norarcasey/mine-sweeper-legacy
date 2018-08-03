const isWinner = (state = null, action) => {
    switch (action.type) {
      case 'SET_IS_WINNER':
        return action.value;
      default:
        return state;
    }
  };

  export default isWinner;
const isGameOver = (state = false, action) => {
    switch (action.type) {
      case 'SET_IS_GAME_OVER':
        return action.value || state;
      default:
        return state;
    }
  };

  export default isGameOver;
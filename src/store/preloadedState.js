const mineLocations = {};

while(Object.keys(mineLocations).length < 10) {
  let random = ~~(82 * (Math.random()));

  if(random === 0 || mineLocations[random]) continue;

  mineLocations[random] = true;
}

const board = [];
for(let i = 1; i <= 81; i++) {
  board.push(mineLocations[i] ? { id: i, type: 'mine', code: 'm' } : { id: i, type: 'blank', code: '' });
}

export const PreloadedState = {
  mines: Object.keys(mineLocations),
  board: board,
  isGameOver: false,
  isWinner: null
}
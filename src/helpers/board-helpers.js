export const revealAdjacent = (id, diffs, board) => {

  while(diffs.length > 0) {

    let diffId = id+diffs.shift();
    console.log(diffId);
    let mineCount = findAdjacentMines(diffId, board);
    if(mineCount > 0) continue;

    revealStyle(diffId);

    // Flag have been here
    if(!board[diffId] || board[diffId].visited) {
      continue;
    } else {
      board[diffId].visited = true;
    }

    revealAdjacent(diffId, validDiffs(diffId), board);
  }
}

export const revealStyle = (id, total = 0) => {
  const el = document.getElementById(`CellId-${id}`);

  if(el.className.indexOf(' revealed') < 0)
    el.className += ' revealed';

  if(total) {
    el.className += ` adj-${total}`;
    el.textContent = total;
  }
}

// CHECK N , NE, E, SE, S, SW, W for bombs
// NW, N, NE => id-10, id-9, id-8
// W, E      => id-1, id+1
// SW, S, SW => id+8, id+9, id+10

export const findAdjacentMines = (id, board) => {
  let total   = 0,
      diffs = validDiffs(id);

  for(let diff of diffs) {
    let cell = board[id+diff-1];

    if(cell && cell.type === 'mine') {
      total++;
    }
  }

  if(total > 0) {
    revealStyle(id, total);
  }

  return total;
};

export const validDiffs = (id) => {
  let diffs = [-10, -9, -8, -1, 1, 8, 9, 10],
      dimension = 9,
      area      = dimension * dimension;

  // Left side
  let left = [1];
  for(let i=1; i < area; i+=dimension) {
    left.push(i);
  }
  if(left.includes(id)) {
    diffs[3] = null;
    diffs[0] = null;
    diffs[5] = null;
  }

  // Right Side
  if(id % dimension === 0) {
    diffs[2] = null;
    diffs[4] = null;
    diffs[7] = null;
  }

  // Top Side
  if(id >= 1 && id <= dimension) {
    diffs[0] = null;
    diffs[1] = null;
    diffs[2] = null;
  }

  // Bottom Side
  if(id > area - dimension && id <= area) {
    diffs[5] = null;
    diffs[6] = null;
    diffs[7] = null;
  }

  return diffs.filter(d => d !== null);
}
export const displayLoser = (el) => {
    // Hide flags
    const flags = document.querySelectorAll('.fa-flag');
    flags.forEach(f => f.style.display = 'none');

    // Style mines to appear clicked
    const mineCells = document.querySelectorAll('.cells .cell.mine');
    mineCells.forEach(cell => {cell.className += ' revealed';});

    // Show mine icons
    const mines = document.querySelectorAll('.cells .cell.mine .fa-bomb');
    mines.forEach(cell => {cell.style.display = 'inline';});

    el.style.backgroundColor = 'red';
}
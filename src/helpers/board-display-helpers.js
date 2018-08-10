export const displayLoser = (el) => {
    document.getElementById('board').className = 'loser';
    el.style.backgroundColor = 'red';
}
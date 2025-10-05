//Dados iniciais
let grid = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let message = '';
let playing = '';

reset();

//Eventos
document.querySelector('.reset').addEventListener('click', reset);

//Funções

function reset() {
    message = '';

    let randon = Math.floor(Math.random() * 2);
    player = (randon === 0) ? 'x' : 'o';

    for (let i in grid) {
        grid[i] = '';
    }

    playing = true;

    renderGrid();
    renderInfo();
}

function renderGrid() {
    for (let i in grid) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = grid[i];
    }
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = message;
}


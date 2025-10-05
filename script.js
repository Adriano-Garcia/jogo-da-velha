// ===== JOGO DA VELHA =====

// Objeto principal do jogo
const game = {
    grid: {
        a1: '', a2: '', a3: '',
        b1: '', b2: '', b3: '',
        c1: '', c2: '', c3: ''
    },
    player: '',
    message: '',
    playing: false,

    // Inicia ou reinicia o jogo
    reset() {
        this.message = '';
        this.playing = true;

        // Escolhe jogador inicial aleatoriamente
        this.player = Math.random() < 0.5 ? 'x' : 'o';

        // Limpa o tabuleiro
        for (let i in this.grid) {
            this.grid[i] = '';
            document.querySelector(`[data-item=${i}]`).classList.remove('winner');
        }

        this.renderGrid();
        this.renderInfo();
    },

    // Renderiza o tabuleiro
    renderGrid() {
        for (let i in this.grid) {
            const el = document.querySelector(`[data-item=${i}]`);
            el.textContent = this.grid[i];
        }
        this.checkGame();
    },

    // Atualiza as informações na tela
    renderInfo() {
        document.querySelector('.vez').textContent = this.player;
        document.querySelector('.resultado').textContent = this.message;
    },

    // Alterna entre os jogadores
    togglePlayer() {
        this.player = this.player === 'x' ? 'o' : 'x';
        this.renderInfo();
    },

    // Verifica status do jogo
    checkGame() {
        if (this.checkWinnerFor('x')) {
            this.message = 'Fim de jogo, "x" venceu!';
            this.playing = false;
        } else if (this.checkWinnerFor('o')) {
            this.message = 'Fim de jogo, "o" venceu!';
            this.playing = false;
        } else if (this.isFull()) {
            this.message = 'Empate!';
            this.playing = false;
        }

        this.renderInfo();
    },

    // Verifica se um jogador venceu
    checkWinnerFor(player) {
        const combos = [
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3'],
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3'],
            ['a1', 'b2', 'c3'],
            ['a3', 'b2', 'c1']
        ];

        for (let combo of combos) {
            const hasWon = combo.every(pos => this.grid[pos] === player);
            if (hasWon) {
                // Destaca as casas vencedoras
                combo.forEach(pos => {
                    document.querySelector(`[data-item=${pos}]`).classList.add('winner');
                });
                return true;
            }
        }
        return false;
    },

    // Verifica se todas as casas foram preenchidas
    isFull() {
        return Object.values(this.grid).every(v => v !== '');
    }
};

// ===== EVENTOS =====

// Clique no botão reset
document.querySelector('.reset').addEventListener('click', () => game.reset());

// Clique nos quadrados do tabuleiro
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', event => {
        const key = event.target.getAttribute('data-item');
        if (game.playing && game.grid[key] === '') {
            game.grid[key] = game.player;
            game.renderGrid();
            game.togglePlayer();
        }
    });
});

// Inicia o jogo ao carregar
game.reset();

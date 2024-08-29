import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import fontawesome from '@salesforce/resourceUrl/fontawesome';

export default class TicTacToe extends LightningElement {
    isLibLoaded = false;
    player1 = 0;
    player2 = 0;
    openedCards = [];
    click = true; // Track whose turn it is
    winner = ''; // Track the winner
    winMess = ''
    isGameOver = false; // Track if the game is over

    boxes = [
        { id: 1, listClass: 'box', icon: '' },
        { id: 2, listClass: 'box', icon: '' },
        { id: 3, listClass: 'box', icon: '' },
        { id: 4, listClass: 'box', icon: '' },
        { id: 5, listClass: 'box', icon: '' },
        { id: 6, listClass: 'box', icon: '' },
        { id: 7, listClass: 'box', icon: '' },
        { id: 8, listClass: 'box', icon: '' },
        { id: 9, listClass: 'box', icon: '' },
    ];

    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    displayBox(event) {
        if (this.isGameOver) {
            return; // Prevent clicking after the game is over
        }

        const currBox = event.target;
        const boxId = parseInt(currBox.dataset.id, 10);
        const boxIndex = this.boxes.findIndex((box) => box.id === boxId);

        // Check if the box is already clicked
        if (this.boxes[boxIndex].icon) {
            return; // Prevent changing an already set box
        }

        // Update the box icon based on whose turn it is
        if (this.click) {
            this.boxes[boxIndex].icon = 'fa fa-times';
        } else {
            this.boxes[boxIndex].icon = 'fa fa-circle-o';
        }

        currBox.classList.add('open', 'show', 'disabled');

        // Toggle the click flag for alternating turns
        this.click = !this.click;

        // Update the boxes array to reflect the changes
        this.boxes = [...this.boxes];

        // Check for a winner
        this.checkWinner();
    }

    checkWinner() {
        for (let combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (
                this.boxes[a].icon &&
                this.boxes[a].icon === this.boxes[b].icon &&
                this.boxes[a].icon === this.boxes[c].icon
            ) {
                this.winner = this.boxes[a].icon === 'fa fa-times' ? 'Player A' : 'Player B';
                this.isGameOver = true;

                // Add winning-box class to winning boxes
                [a, b, c].forEach((index) => {
                    this.template.querySelector(`[data-id="${this.boxes[index].id}"]`).classList.add('winning-box');
                    this.template.querySelector(`[data-id="${this.boxes[index].id}"]`).classList.remove('open');
                });

                this.updateScore();
                return;
            }
        }

        // Check for a draw
        if (this.boxes.every((box) => box.icon)) {
            this.winner = 'Match Draw'  
            this.isGameOver = true;         
            this.winMess = 'Match Draw !!!';
        }
    }

    updateScore() {
        if (this.winner === 'Player A') {
            this.player1++;
            this.winMess = "Player A Wins !!!"
        } else if (this.winner === 'Player B') {
            this.player2++;
            this.winMess = "Player B Wins !!!"
        }
    }

    resetGame() {
        this.boxes = this.boxes.map((box) => ({ ...box, icon: '' }));
        this.winner = '';
        this.isGameOver = false;
        this.click = true;
        let elem = this.template.querySelectorAll('.box');
        Array.from(elem).forEach((item) => {
            item.classList.remove('show', 'open', 'disabled', 'winning-box');
        });
    }

    renderedCallback() {
        if (this.isLibLoaded) {
            return;
        } else {
            loadStyle(this, fontawesome + '/fontawesome/css/font-awesome.min.css')
                .then(() => {
                    console.log('FontAwesome loaded successfully');
                })
                .catch((error) => {
                    console.error('Error loading FontAwesome:', error);
                });
            this.isLibLoaded
        }
    }
}
import { createBoard } from './game.js';
import { savePlayerName } from './modal.js';

let modalButton = document.querySelector('.modal__window__button')
let modalToss = document.querySelector('.modal-toss')
let firstStep = 0
let currentPlayerIndex = firstStep

const firstPlayerRadio = document.getElementById('firstPlayerRadio')
const secondPlayerRadio = document.getElementById('secondPlayerRadio')

firstPlayerRadio.addEventListener('click', () => {
    currentPlayerIndex = 0
    modalToss.classList.remove('active')
})

secondPlayerRadio.addEventListener('click', () => {
    currentPlayerIndex = 1
    modalToss.classList.remove('active')
})

modalButton.addEventListener('click', savePlayerName)

createBoard()
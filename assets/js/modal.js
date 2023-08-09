const firstPlayerButton = document.getElementById('first')
const secondPlayerButton = document.getElementById('second')

let modal = document.querySelector('.modal')
let modalInput = document.querySelector('.modal__window__input')
let modalButton = document.querySelector('.modal__window__button')
let activePlayer = null
let activePlayerButton = null
let activePlayerKey = ''

let modalTossFirstPlayer = document.querySelector('.modal-toss__window__first')
let modalTossSecondPlayer = document.querySelector('.modal-toss__window__second')

let firstPlayer = {'name': 'Player 1',}
let secondPlayer = {'name': 'Player 2',}

firstPlayerButton.addEventListener('click', () => openModal(firstPlayer))
firstPlayerButton.innerText = localStorage.getItem('firstPlayerName') ? localStorage.getItem('firstPlayerName') : 'Player 1'
modalTossFirstPlayer.innerText = localStorage.getItem('firstPlayerName') ? localStorage.getItem('firstPlayerName') : 'Player 1'

secondPlayerButton.addEventListener('click', () => openModal(secondPlayer))
secondPlayerButton.innerText = localStorage.getItem('secondPlayerName') ? localStorage.getItem('secondPlayerName') : 'Player 2'
modalTossSecondPlayer.innerText = localStorage.getItem('secondPlayerName') ? localStorage.getItem('secondPlayerName') : 'Player 2'

window.addEventListener("load", () => {
    document.querySelector('.modal-toss').classList.add('active')
})

function openModal(player) {
    activePlayer = player
    activePlayerButton = event.currentTarget
    activePlayerKey = (player === firstPlayer) ? 'firstPlayerName' : 'secondPlayerName'
    
    modalInput.value = player.name
    modal.classList.add('active')
}

export function savePlayerName() {
    const newName = modalInput.value

    if (activePlayer) {
        activePlayer.name = newName
        localStorage.setItem(activePlayerKey, newName)
        activePlayerButton.innerText = newName
    }

    modalInput.value = ''
    modal.classList.remove('active')
}

modalButton.addEventListener('click', () => {
    modal.classList.remove('active')
})
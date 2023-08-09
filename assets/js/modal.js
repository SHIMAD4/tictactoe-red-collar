const firstPlayerButton = document.getElementById('first')
const secondPlayerButton = document.getElementById('second')

// Выбор элементов модального окна
let modal = document.querySelector('.modal')
let modalInput = document.querySelector('.modal__window__input')
let modalButton = document.querySelector('.modal__window__button')

// Инициализация переменных для активного игрока
let activePlayer = null
let activePlayerButton = null
let activePlayerKey = ''

// Выбор элементов окна "подброса монетки"
let modalTossFirstPlayer = document.querySelector('.modal-toss__window__first')
let modalTossSecondPlayer = document.querySelector('.modal-toss__window__second')

// Инициализация объектов для игроков
let firstPlayer = {'name': 'Player 1'}
let secondPlayer = {'name': 'Player 2'}

// Добавление слушателей события клика на кнопки игроков
firstPlayerButton.addEventListener('click', () => openModal(firstPlayer))
firstPlayerButton.innerText = localStorage.getItem('firstPlayerName') ? localStorage.getItem('firstPlayerName') : 'Player 1'
modalTossFirstPlayer.innerText = localStorage.getItem('firstPlayerName') ? localStorage.getItem('firstPlayerName') : 'Player 1'

secondPlayerButton.addEventListener('click', () => openModal(secondPlayer))
secondPlayerButton.innerText = localStorage.getItem('secondPlayerName') ? localStorage.getItem('secondPlayerName') : 'Player 2'
modalTossSecondPlayer.innerText = localStorage.getItem('secondPlayerName') ? localStorage.getItem('secondPlayerName') : 'Player 2'

// Событие загрузки страницы
window.addEventListener("load", () => {
    document.querySelector('.modal-toss').classList.add('active') // Добавление класса 'active' к элементу modal-toss
})

// Функция открытия модального окна
function openModal(player) {
    activePlayer = player
    activePlayerButton = event.currentTarget
    activePlayerKey = (player === firstPlayer) ? 'firstPlayerName' : 'secondPlayerName'

    modalInput.value = player.name
    modal.classList.add('active')
}

// Функция сохранения имени игрока
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
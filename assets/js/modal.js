import { FIRST_PLAYER, SECOND_PLAYER } from './constans.js';

const firstPlayerButton = document.getElementById('first')
const secondPlayerButton = document.getElementById('second')

// Выбор элементов окна "подброса монетки"
const modalTossFirstPlayer = document.querySelector('.modal-toss__window__first')
const modalTossSecondPlayer = document.querySelector('.modal-toss__window__second')

// Выбор элементов модального окна
let modal = document.querySelector('.modal')
let modalInput = document.querySelector('.modal__window__input')
let modalButton = document.querySelector('.modal__window__button')

// Инициализация переменных для активного игрока
let activePlayer = null
let activePlayerButton = null
let activePlayerKey = ''

// Добавление слушателей события клика на кнопки игроков
function addCLick(player, openButton, radioButton) {
    openButton.addEventListener('click', (event) => openModal(player, event))
    openButton.innerText = localStorage.getItem(player.key) ?? player.name
    radioButton.innerText = localStorage.getItem(player.key) ?? player.name
}

addCLick(FIRST_PLAYER, firstPlayerButton, modalTossFirstPlayer)
addCLick(SECOND_PLAYER, secondPlayerButton, modalTossSecondPlayer)

// Событие загрузки страницы
window.addEventListener("load", () => {
    document.querySelector('.modal-toss').classList.add('active') // Добавление класса 'active' к элементу modal-toss
})

// Функция открытия модального окна
function openModal(player, event) {
    activePlayer = player
    activePlayerButton = event.currentTarget
    activePlayerKey = (player === FIRST_PLAYER) ? FIRST_PLAYER.key : SECOND_PLAYER.key

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
// Импорт функций из внешних модулей
import { createBoard } from './game.js'
import { savePlayerName } from './modal.js'

// Выбор элементов из DOM
let modalButton = document.querySelector('.modal__window__button')
let modalToss = document.querySelector('.modal-toss')              
let firstStep = 0                                                  // Инициализация переменной для представления первого шага
let currentPlayerIndex = firstStep

const firstPlayerRadio = document.getElementById('firstPlayerRadio')
const secondPlayerRadio = document.getElementById('secondPlayerRadio')

// Добавление слушателя события клика на первую радио-кнопку игрока
firstPlayerRadio.addEventListener('click', () => {
    currentPlayerIndex = 0                          // Установка currentPlayerIndex в 0 (индикация хода первого игрока)
    modalToss.classList.remove('active')            // Удаление класса 'active' у элемента modalToss для его скрытия
})
secondPlayerRadio.addEventListener('click', () => {
    currentPlayerIndex = 1
    modalToss.classList.remove('active')
})

modalButton.addEventListener('click', savePlayerName)

// Вызов функции createBoard для создания игровой доски
createBoard()
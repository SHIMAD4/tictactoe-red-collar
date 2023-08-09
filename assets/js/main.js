// Импорт функций из внешних модулей
import { createBoard } from './game.js'
import { savePlayerName } from './modal.js'

let modalButton = document.querySelector('.modal__window__button')          

modalButton.addEventListener('click', savePlayerName)

// Вызов функции createBoard для создания игровой доски
createBoard()
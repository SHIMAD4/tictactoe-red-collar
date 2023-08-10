import { FIRST_PLAYER, MESH_ELEMENTS, SECOND_PLAYER, WIN_POSITION } from './constans.js';

const firstPlayerRadio = document.getElementById('firstPlayerRadio')
const secondPlayerRadio = document.getElementById('secondPlayerRadio')

let showWinnerBlock = document.querySelector('.show-winner__text')
let retryButton = document.querySelector('.retry-block__btn')
let modalToss = document.querySelector('.modal-toss')

// Инициализация переменных для хода игроков
let firstStep = 0
let currentPlayerIndex = firstStep

const setActivityPlayerIndex = (index) => {
    currentPlayerIndex = index                      // Установка currentPlayerIndex в 0 (индикация хода первого игрока)
    modalToss.classList.remove('active')            // Удаление класса 'active' у элемента modalToss для его скрытия
}

firstPlayerRadio.addEventListener('click', () => setActivityPlayerIndex(0))
secondPlayerRadio.addEventListener('click', () => setActivityPlayerIndex(1))

// Функция для создания игровой доски
export function createBoard() {
    let section = document.createElement('section')
    let ul = document.createElement('ul')
    section.classList.add('game-block')
    ul.classList.add('game-block__list')
    
    for (let i = 0; i < MESH_ELEMENTS; i++) {
        let li = document.createElement('li')
        li.classList.add('game-block__list-item')
        li.setAttribute('id', i)
        ul.appendChild(li)
        li.addEventListener('click', checkStep)
    }
    
    section.appendChild(ul)
    document.querySelector('main').insertBefore(section, document.querySelector('.retry-block'))
}

// Функция для создания фигуры в указанной ячейке
const createShape = (shapeName, id) => {
    const shapeClasses = {
        'circle': 'circle',
        'cross': 'cross'
    }
    const blocks = document.querySelectorAll('.game-block__list-item')
    const shape = document.createElement('div')
    shape.classList.add(shapeClasses[shapeName])
    blocks[id].appendChild(shape)
}

// Функция для проверки хода и смены игрока
function checkStep(e) {
    if (currentPlayerIndex === 0) {
        createShape('circle', e.target.getAttribute('id'))
    } else {
        createShape('cross', e.target.getAttribute('id'))
    }
    currentPlayerIndex = 1 - currentPlayerIndex
    checkWinPos()
}

// Функция для проверки победных позиций
function checkWinPos() {
    let blocks = document.querySelectorAll('.game-block__list-item')
    let allCellsOccupied = true

    WIN_POSITION.forEach(arr => {
        let circleWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('circle'))
        let crossWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('cross'))

        if (circleWins) {
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            showWinner(`${localStorage.getItem(FIRST_PLAYER.key) ?? 'Player 1'}` + ' wins!')
            return
        }

        if (crossWins) {
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            showWinner(`${localStorage.getItem(SECOND_PLAYER.key) ?? 'Player 2'}` + ' wins!')
            return
        }

        if (arr.some(cell => !blocks[cell].firstChild)) {
            allCellsOccupied = false
        }
    })

    if (allCellsOccupied) {
        blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
        showWinner("It's a Draw")
    }
}

// Функция для отображения сообщения о победителе
function showWinner(str) {
    showWinnerBlock.classList.add('active')
    retryButton.classList.add('active')
    showWinnerBlock.innerText = str
}

// Функция для перезапуска матча
retryButton.addEventListener('click', retryMatch)
function retryMatch() {
    let board = document.querySelector('.game-block')
    showWinnerBlock.classList.remove('active')
    retryButton.classList.remove('active')
    currentPlayerIndex = (currentPlayerIndex === 0) ? 0 : 1
    board.remove()
    createBoard()
}
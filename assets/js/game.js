const firstPlayerRadio = document.getElementById('firstPlayerRadio')
const secondPlayerRadio = document.getElementById('secondPlayerRadio')

let showWinnerBlock = document.querySelector('.show-winner__text')
let retryButton = document.querySelector('.retry-block__btn')
let modalToss = document.querySelector('.modal-toss')

// Инициализация переменных для хода игроков
let firstStep = 0
let currentPlayerIndex = firstStep

firstPlayerRadio.addEventListener('click', () => {
    currentPlayerIndex = 0                          // Установка currentPlayerIndex в 0 (индикация хода первого игрока)
    modalToss.classList.remove('active')            // Удаление класса 'active' у элемента modalToss для его скрытия
})
secondPlayerRadio.addEventListener('click', () => {
    currentPlayerIndex = 1
    modalToss.classList.remove('active')
})

// Функция для создания игровой доски
export function createBoard() {
    let section = document.createElement('section')
    let ul = document.createElement('ul')
    section.classList.add('game-block')
    ul.classList.add('game-block__list')
    
    for (let i = 0; i < 9; i++) {
        let li = document.createElement('li')
        li.classList.add('game-block__list-item')
        li.setAttribute('id', i)
        ul.appendChild(li)
        li.addEventListener('click', checkStep)
    }
    
    section.appendChild(ul)
    document.querySelector('main').insertBefore(section, document.querySelector('.retry-block'))
}

// Функция для создания круга в указанной ячейке
function createCircle(id) {
    let blocks = document.querySelectorAll('.game-block__list-item')
    let circle = document.createElement('div')
    circle.classList.add('circle')
    blocks[id].appendChild(circle)
    return
}

// Функция для создания крестика в указанной ячейке
function createCross(id) {
    let blocks = document.querySelectorAll('.game-block__list-item')
    let cross = document.createElement('div')
    cross.classList.add('cross')
    blocks[id].appendChild(cross)
    return
}

// Функция для проверки хода и смены игрока
function checkStep(e) {
    if (currentPlayerIndex === 0) {
        createCircle(e.target.getAttribute('id'))
    } else {
        createCross(e.target.getAttribute('id'))
    }
    currentPlayerIndex = 1 - currentPlayerIndex
    checkWinPos()
}

// Функция для проверки победных позиций
function checkWinPos() {
    let blocks = document.querySelectorAll('.game-block__list-item')
    let allCellsOccupied = true

    const winPos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
        [0, 4, 8], [2, 4, 6]             // Диагонали
    ]

    winPos.forEach(arr => {
        let circleWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('circle'))
        let crossWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('cross'))

        if (circleWins) {
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            showWinner(`${localStorage.getItem('firstPlayerName') ? localStorage.getItem('firstPlayerName') : 'Player 1'}` + ' wins!')
            return
        }

        if (crossWins) {
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            showWinner(`${localStorage.getItem('secondPlayerName') ? localStorage.getItem('secondPlayerName') : 'Player 2'}` + ' wins!')
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
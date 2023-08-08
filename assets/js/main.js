// Сделать мини-игру Крестики-нолики

// 1. Есть возможность ввести имена пользователей и выбрать, кто начинает первым

const firstPlayerButton = document.getElementById('first')
const secondPlayerButton = document.getElementById('second')
let showWinnerBlock = document.querySelector('.show-winner__text')
let retryButton = document.querySelector('.retry-block__btn')
let modal = document.querySelector('.modal')
let modalInput = document.querySelector('.modal__window__input')
let modalButton = document.querySelector('.modal__window__button')
let activePlayer = null
let activePlayerButton = null
let activePlayerKey = ''

let firstStep = 0

let firstPlayer = {'name': 'Player 1',}
let secondPlayer = {'name': 'Player 2',}

firstPlayerButton.addEventListener('click', () => openModal(firstPlayer))
secondPlayerButton.addEventListener('click', () => openModal(secondPlayer))

modalButton.addEventListener('click', () => {
    modal.classList.remove('active')
})

function savePlayerName() {
    const newName = modalInput.value

    if (activePlayer) {
        activePlayer.name = newName
        localStorage.setItem(activePlayerKey, newName)
        activePlayerButton.innerText = newName
    }

    modalInput.value = ''
    modal.classList.remove('active')
}

modalButton.addEventListener('click', savePlayerName)

function openModal(player) {
    activePlayer = player
    activePlayerButton = event.currentTarget
    activePlayerKey = (player === firstPlayer) ? 'firstPlayerName' : 'secondPlayerName'
    
    modalInput.value = player.name
    modal.classList.add('active')
}


function checkStep(e) {
    switch (firstStep) {
        case 0:
            createCircle(e.target.getAttribute('id'))
            firstStep = 1
            e.target.removeEventListener('click', checkStep)
            e.target.classList.remove('state')
            break
        case 1:
            createCross(e.target.getAttribute('id'))
            firstStep = 0
            e.target.removeEventListener('click', checkStep)
            e.target.classList.remove('state')
            break
    }
    checkWinPos()
}

function createBoard() {
    let section = document.createElement('section')
    let ul = document.createElement('ul')
    section.classList.add('game-block')
    ul.classList.add('game-block__list')
    for(let i = 0; i < 9; i++) {
        let li = document.createElement('li')
        li.classList.add('game-block__list-item')
        li.setAttribute('id', i)
        ul.appendChild(li)
        li.addEventListener('click', checkStep)
    }
    section.appendChild(ul)
    document.querySelector('main').insertBefore(section, document.querySelector('.retry-block'))
}

function createCircle(id) {
    let blocks = document.querySelectorAll('.game-block__list-item')
    let circle = document.createElement('div')
    circle.classList.add('circle')
    blocks[id].appendChild(circle)
    return
}

function createCross(id) {
    let blocks = document.querySelectorAll('.game-block__list-item')
    let cross = document.createElement('div')
    cross.classList.add('cross')
    blocks[id].appendChild(cross)
    return
}

function checkWinPos() {
    let blocks = document.querySelectorAll('.game-block__list-item')
    let allCellsOccupied = true

    const winPos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ]

    winPos.forEach(arr => {
        let circleWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('circle'))
        let crossWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('cross'))

        if(circleWins) {
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            showWinner(`${firstPlayer.name}` + ' wins!')
            return
        }

        if(crossWins) {
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            showWinner(`${secondPlayer.name}` + ' wins!')
            return
        }
    
        if (arr.some(cell => !blocks[cell].firstChild)) {
            allCellsOccupied = false
        }
    })

    if (allCellsOccupied) {
        blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
        showWinner('It\'s a Draw')
    }
}

function showWinner(str) {
    showWinnerBlock.classList.add('active')
    retryButton.classList.add('active')
    showWinnerBlock.innerText = `${str}`
}

retryButton.addEventListener('click', retryMatch)
function retryMatch() {
    let board = document.querySelector('.game-block')
    showWinnerBlock.classList.remove('active')
    retryButton.classList.remove('active')
    firstStep = 0
    board.remove()
    createBoard()
}

createBoard()
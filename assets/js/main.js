// Сделать мини-игру Крестики-нолики

// 1. Есть возможность ввести имена пользователей и выбрать, кто начинает первым
// 2. Сделать поле 3х3 клетки, просчитать возможные комбинации для выигрышных ходов игроков
// 3. По окончанию игры выводить сообщение о победителе

let board = document.querySelector('.game-block')
let blocks = document.querySelectorAll('.game-block__list-item')

let firstStep = 0

blocks.forEach(block => {
    block.addEventListener('click', checkStep)
})

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

function createCircle(id) {
    let circle = document.createElement('div')
    circle.classList.add('circle')
    blocks[id].append(circle)
    return
}

function createCross(id) {
    let cross = document.createElement('div')
    cross.classList.add('cross')
    blocks[id].append(cross)
    return
}

function checkWinPos() {
    const winPos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ]
    winPos.forEach(arr => {
        let circleWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('circle'))
        if(circleWins) {
            console.log('Circle Wins')
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            return
        }
    })
    winPos.forEach(arr => {
        let crossWins = arr.every(cell => blocks[cell].firstChild?.classList.contains('cross'))
        if(crossWins) {
            console.log('Cross Wins')
            blocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            return
        }
    })
}
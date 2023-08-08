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
            break
        case 1:
            createCross(e.target.getAttribute('id'))
            firstStep = 0
            e.target.removeEventListener('click', checkStep)
            break
    }
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
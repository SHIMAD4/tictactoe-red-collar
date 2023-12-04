// Константы данных пользователей
const FIRST_PLAYER = {
    'name': 'Player 1',
    'key': 'firstPlayerName'
}

const SECOND_PLAYER = {
    'name': 'Player 2',
    'key': 'secondPlayerName'
}

// Константа победных позиций
const WIN_POSITION = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

// Константа кол-ва элементов заполнения игрового поля
const MESH_ELEMENTS = 9

export {
    FIRST_PLAYER,
    MESH_ELEMENTS,
    SECOND_PLAYER,
    WIN_POSITION
}


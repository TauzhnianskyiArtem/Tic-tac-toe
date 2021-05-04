let grid = document.querySelector('.grid')
let cells = document.querySelectorAll('.cell')
let playerSelect = document.querySelector('.welcome')
let reset = document.getElementById('reset')
let winnerMsg = document.getElementById('winner-msg')
let timerMove = document.querySelector('.timer-show')
let timerGame = document.querySelector('.timer-game')
let player = ""
let computer = ""
let gameOn = false
let moves = 0
let playerMovesCopy
let computerMovesCopy
let nextMoveIdx
let computerMovesNext
let playerMovesNext
let nextMove
let compBlock
let compWin
let secondMove = 10
let secondGame = 60

alert("Перед началом игры, выберите за кого будете играть: Х или О")

let timerGameOver = setInterval(() => {
    if (!gameOn && moves !== 0)
        secondGame = 60
    if (secondGame === 0) {
        board = [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
        ]

        cells.forEach(function (cell) {
            cell.textContent = "";
        });
        gameOn = true
    } else {
        timerGame.innerHTML = "<h2>Осталось времени игры: " + secondGame + "<\h2>"
    }
    --secondGame
}, 1000)


let timer = setInterval(() => {
    if (!gameOn && moves !== 0)
        secondMove = 10
    if (secondMove === 0) {
        syncBoard()
        computerChoose()
        computerPlay()
        declareWinner()
        moves++
        secondMove = 10
    } else {
        timerMove.innerHTML = "<h2>Осталось времени на ход: " + secondMove + "<\h2>"
    }
    --secondMove
}, 1000)


let board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
]

// Победные комбинации
let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

playerSelect.addEventListener('click', choosePlayer, false);

// выбор игрока играть за Х или О
function choosePlayer(e) {
    if (e.target !== e.currentTarget && gameOn === false) {
        gameOn = true

        if (e.target.textContent === "X") {
            player = playerChar.textContent = "X"
            computer = computerChar.textContent = "O"
        }
        if (e.target.innerHTML === "O") {
            player = playerChar.textContent = player = "O"
            computer = computerChar.textContent = "X"
        }
    }
}

grid.addEventListener('click', updateBoard, false);

// Игра
function updateBoard(e) {
    if (e.target.className === "cell") {
        if (e.target.textContent !== player && e.target.textContent !== computer) {
            e.target.textContent = player;
            secondMove = 10
            syncBoard()
            moves++
            computerChoose()
            computerPlay()
            console.log(computerMoves().toString())
            declareWinner()

        }

    }
}

// Синхронизация ячеек
function syncBoard() {
    for (let i = 0; i < board.length; i++) {
        if (cells[i].innerHTML !== "") {
            board[i] = cells[i].innerHTML;
        }
    }
}

// Возврат пустых ячеек
function validMoves() {
    return board.filter((spot) => spot !== "O" && spot !== "X")
}

// Возврат ячеек, занятых игроком
function playerMoves() {
    let idx = []
    let i = -1
    while ((i = board.indexOf(player, i + 1)) !== -1) {
        idx.push(i);
    }
    return idx;
}

// Выбор хода для компьбтера
function computerChoose() {

    for (let i = 0; i < validMoves().length; i++) {

        computerMovesNext = computerMoves().slice();
        playerMovesNext = playerMoves().slice();
        nextMove = validMoves()[i];
        computerMovesNext.push(nextMove);
        playerMovesNext.push(nextMove);

        for (let j = 0; j < wins.length; j++) {
            // Выбор хода для победы
            if (wins[j].every(e => computerMovesNext.indexOf(e) > -1)) {
                compWin = nextMove;
            }
            // Выбор хода для блокировки игрока
            if (wins[j].every(e => playerMovesNext.indexOf(e) > -1)) {
                compBlock = nextMove;
            }
        }

    }
}

// Возврат ячеек, занятых компьютером
function computerMoves() {
    let idx = [];
    let i = -1;
    while ((i = board.indexOf(computer, i + 1)) !== -1) {
        idx.push(i);
    }
    return idx;
}

// Ход компьютера
function computerPlay() {

    moves++;

    let len = validMoves().length;
    let rand = validMoves()[Math.floor(Math.random() * len)];

    if (board[compWin] !== player && board[compWin] !== computer && board[compWin] !== undefined) {
        board[compWin] = cells[compWin].innerHTML = computer;
    } else if (board[compBlock] !== player && board[compBlock] !== computer && board[compBlock] !== undefined) {
        board[compBlock] = cells[compBlock].innerHTML = computer;
    } else if (board[4] === 4) {
        board[4] = cells[4].innerHTML = computer;
    } else if (board[rand] !== undefined) {
        board[rand] = cells[rand].innerHTML = computer;
    }
}

function declareWinner() {

    if (gameOn === true) {
        computerMove = computerMoves()
        playerMove = playerMoves()
        for (let j = 0; j < wins.length; j++) {
            if ((wins[j].every(e => playerMove.indexOf(e) > -1))) {
                winnerMsg.innerHTML = "<h2>Вы выиграли!!!</h2>";
                gameOn = false;
            } else if ((wins[j].every(e => computerMove.indexOf(e) > -1))) {
                winnerMsg.innerHTML = "<h2>Выиграл компьютер!!!</h2>";
                gameOn = false;
            } else if (validMoves().length === 0) {
                winnerMsg.innerHTML = "<h2>Ничья!!!</h2>";
                gameOn = false;
            }
        }
    }
}

//Перезапуск игры
reset.addEventListener('click', function () {


    board = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ]

    cells.forEach(function (cell) {
        cell.textContent = "";
    });
    gameOn = true
    winnerMsg.textContent = "";


}, false);

import * as UI from "./ui";
import { GameBrain } from "./game";
import { AI } from "./ai";

function cellUpdateFnABC(x: number, y: number, e: Event): void {
    const target = e.target as HTMLElement;
    game.makeAMove(x, y);
    target.innerHTML = game.board[x][y] || "&nbsp;";
}

let game: GameBrain = new GameBrain();

let boardController: HTMLElement = UI.getGamePageUI(game);
let board: HTMLElement = UI.getInitialBoard(game, cellUpdateFnABC);

let gameAi: AI = new AI();

boardController.appendChild(board);

export function updateGridUI(): void {
    unblockCell();
    let cells: NodeListOf<HTMLElement> = document.querySelectorAll(".board_cell");
    let pieces: NodeListOf<HTMLElement> = document.querySelectorAll(".piece");

    cells.forEach((cell, index) => {
        let x: number = Math.floor(index / 5);
        let y: number = index % 5;

        if (x >= game.gridStartRow &&
            x <= game.gridEndRow &&
            y >= game.gridStartCol &&
            y <= game.gridEndCol) {
            cell.classList.add("grid_cell");
        } else {
            cell.classList.remove("grid_cell");
        }

        pieces[index].textContent = game.board[x][y] || "";
    });

    if (CheckWinCondition()) {
        return;
    }

    game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
    updateNextMoveIndicator();

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    if (mode === "pvai") {
        aiTurn();
    }
}

function aiTurn(): void {
    if (game.currentPlayer === "O") {
        blockCell();
        setTimeout(() => {
            gameAi.makeMove(game);
        }, 500);
    }
}

export function updateNextMoveIndicator(): void {
    let indicator = document.getElementById("next-move-indicator");
    if (indicator) {
        indicator.innerHTML = "Next Move By: " + game.currentPlayer;
    }
}

export function CheckWinCondition(): boolean {
    let win: boolean = false;

    for (let i = game.gridStartRow; i <= game.gridEndRow; i++) {
        if (game.board[i].slice(game.gridStartCol, game.gridEndCol + 1).every(cell => cell === game.currentPlayer)) {
            win = true;
        }
    }

    for (let j = game.gridStartCol; j <= game.gridEndCol; j++) {
        let columnWin: boolean = true;
        for (let i = game.gridStartRow; i <= game.gridEndRow; i++) {
            if (game.board[i][j] !== game.currentPlayer) {
                columnWin = false;
                break;
            }
        }
        if (columnWin) win = true;
    }

    let mainDiagonalWin: boolean = true;
    for (let i = 0; i <= game.gridEndRow - game.gridStartRow; i++) {
        if (game.board[game.gridStartRow + i][game.gridStartCol + i] !== game.currentPlayer) {
            mainDiagonalWin = false;
            break;
        }
    }
    if (mainDiagonalWin) win = true;

    let antiDiagonalWin: boolean = true;
    for (let i = 0; i <= game.gridEndRow - game.gridStartRow; i++) {
        if (game.board[game.gridStartRow + i][game.gridEndCol - i] !== game.currentPlayer) {
            antiDiagonalWin = false;
            break;
        }
    }
    if (antiDiagonalWin) win = true;

    if (win) {
        blockCell();
        let winMessage = document.getElementById("win-message");
        if (winMessage) {
            winMessage.innerHTML = `${game.currentPlayer} wins!`;
            winMessage.style.display = "flex";
        }
    }

    return win;
}

function blockCell(): void {
    document.querySelectorAll(".board_cell").forEach(cell => {
        cell.classList.add("cell_block");
    });
    document.querySelectorAll(".direction-btn").forEach(direction => {
        direction.classList.add("cell_block");
    });
}

function unblockCell(): void {
    document.querySelectorAll(".board_cell").forEach(cell => {
        cell.classList.remove("cell_block");
    });
    document.querySelectorAll(".direction-btn").forEach(direction => {
        direction.classList.remove("cell_block");
    });
}
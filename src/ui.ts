export function getInitialBoard(gameBrain: GameBrain, cellUpdateFn: (i: number, j: number, event: Event) => void): HTMLDivElement {
    const boardUi = document.createElement("div");
    boardUi.classList.add("board");

    const boardMessage = document.createElement("div");
    boardMessage.classList.add("board_message");
    boardUi.appendChild(boardMessage);

    const nextMoveBy = document.createElement("p");
    nextMoveBy.id = "next-move-indicator";
    nextMoveBy.textContent = "Next Move By: " + gameBrain.currentPlayer;
    boardMessage.appendChild(nextMoveBy);

    const winMessage = document.createElement("p");
    winMessage.id = "win-message";
    boardMessage.appendChild(winMessage);

    for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            if (i >= gameBrain.gridStartRow && i <= gameBrain.gridEndRow &&
                j >= gameBrain.gridStartCol && j <= gameBrain.gridEndCol) {
                cell.classList.add("grid_cell");
            }
            cell.classList.add("board_cell");

            const piece = document.createElement("div");
            piece.classList.add("piece");
            piece.textContent = gameBrain.board[i][j] || "";

            piece.addEventListener("click", (event) => cellUpdateFn(i, j, event));
            cell.appendChild(piece);
            row.appendChild(cell);
        }
        boardUi.appendChild(row);
    }

    return boardUi;
}

export function getGamePageUI(gameBrain: GameBrain): HTMLDivElement {
    const parentUi = document.createElement("div");
    parentUi.classList.add("parent");
    document.body.appendChild(parentUi);

    const h1 = document.createElement("h1");
    h1.textContent = "TIC TAC TWO";
    parentUi.appendChild(h1);

    const boardController = createBoardController(gameBrain);
    parentUi.appendChild(boardController);

    return boardController;
}

function createBoardController(gameBrain: GameBrain): HTMLDivElement {
    const boardController = document.createElement("div");
    boardController.classList.add("board_controller");

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control_panel");
    boardController.appendChild(controlPanel);

    const gridControl = createGridControl(gameBrain);
    const mainControl = createMainControl();

    controlPanel.appendChild(gridControl);
    controlPanel.appendChild(mainControl);

    return boardController;
}

function createMainControl(): HTMLDivElement {
    const mainControl = document.createElement("div");
    mainControl.classList.add("main_control");

    const mainButtons: { class: string; label: string; route?: string; action?: () => void }[] = [
        { class: "btn1", label: "Exit", route: "index.html" },
        { class: "btn2", label: "Reset", action: () => location.reload() }
    ];

    mainButtons.forEach(({ class: btnClass, label, route, action }) => {
        const button = document.createElement("button");
        button.classList.add("main-btn", btnClass);
        button.textContent = label;

        if (route) {
            button.dataset.route = route;
        }

        if (action) {
            button.addEventListener("click", action);
        }

        mainControl.appendChild(button);
    });

    return mainControl;
}

function createGridControl(gameBrain: GameBrain): HTMLDivElement {
    const gridControl = document.createElement("div");
    gridControl.classList.add("grid_control");

    const directions: { class: string; symbol: string; dir: string }[] = [
        { class: "up-left", symbol: "↖", dir: "up-left" },
        { class: "up", symbol: "↑", dir: "up" },
        { class: "up-right", symbol: "↗", dir: "up-right" },
        { class: "left", symbol: "←", dir: "left" },
        { class: "right", symbol: "→", dir: "right" },
        { class: "down-left", symbol: "↙", dir: "down-left" },
        { class: "down", symbol: "↓", dir: "down" },
        { class: "down-right", symbol: "↘", dir: "down-right" }
    ];

    const circle = document.createElement("div");
    circle.classList.add("circle");
    gridControl.appendChild(circle);

    directions.forEach(({ class: directionClass, symbol, dir }) => {
        const button = document.createElement("button");
        button.classList.add("direction-btn", directionClass);
        button.innerHTML = symbol;
        button.addEventListener("click", () => gameBrain.moveGrid(dir));
        circle.appendChild(button);
    });

    return gridControl;
}

interface GameBrain {
    currentPlayer: string;
    gridStartRow: number;
    gridEndRow: number;
    gridStartCol: number;
    gridEndCol: number;
    board: (string | null)[][];
    moveGrid: (dir: string) => void;
}
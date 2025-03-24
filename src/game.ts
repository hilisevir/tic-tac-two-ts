import { CheckWinCondition, updateGridUI, updateNextMoveIndicator } from "./gameplay.js";

export class GameBrain {
    public board: (string | null)[][] = Array.from({ length: 5 }, () => Array(5).fill(null));
    public gridStartRow: number = 1;
    public gridEndRow: number = 3;
    public gridStartCol: number = 1;
    public gridEndCol: number = 3;

    public currentPlayer: string = "X";

    public makeAMove(x: number, y: number): void {
        if (this.board[x][y] === null) {
            this.board[x][y] = this.currentPlayer;
            updateGridUI();

            if (CheckWinCondition()) return;
            updateNextMoveIndicator();
        } else if (this.board[x][y] === this.currentPlayer) {
            this.board[x][y] = null;
        }
    }

    public moveGrid(direction: string): void {
        const gridStartRowTemp = this.gridStartRow;
        const gridEndRowTemp = this.gridEndRow;
        const gridEndColTemp = this.gridEndCol;
        const gridStartColTemp = this.gridStartCol;

        switch (direction) {
            case "up":
                if (this.gridStartRow > 0) {
                    this.gridStartRow--;
                    this.gridEndRow--;
                }
                break;
            case "down":
                if (this.gridEndRow < 4) {
                    this.gridStartRow++;
                    this.gridEndRow++;
                }
                break;
            case "left":
                if (this.gridStartCol > 0) {
                    this.gridStartCol--;
                    this.gridEndCol--;
                }
                break;
            case "right":
                if (this.gridEndCol < 4) {
                    this.gridStartCol++;
                    this.gridEndCol++;
                }
                break;
            case "up-left":
                if (gridStartRowTemp > 0 && gridStartColTemp > 0) {
                    this.gridStartRow--;
                    this.gridEndRow--;
                    this.gridStartCol--;
                    this.gridEndCol--;
                }
                break;
            case "up-right":
                if (gridStartRowTemp > 0 && gridEndColTemp < 4) {
                    this.gridStartRow--;
                    this.gridEndRow--;
                    this.gridStartCol++;
                    this.gridEndCol++;
                }
                break;
            case "down-left":
                if (gridEndRowTemp < 4 && gridStartColTemp > 0) {
                    this.gridStartRow++;
                    this.gridEndRow++;
                    this.gridStartCol--;
                    this.gridEndCol--;
                }
                break;
            case "down-right":
                if (gridEndRowTemp < 4 && gridEndColTemp < 4) {
                    this.gridStartRow++;
                    this.gridEndRow++;
                    this.gridStartCol++;
                    this.gridEndCol++;
                }
                break;
        }
        updateGridUI();
    }
}
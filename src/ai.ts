interface Move {
    x: number;
    y: number;
}

interface GameBrain {
    board: (string | null)[][];
    gridStartRow: number;
    gridEndRow: number;
    gridStartCol: number;
    gridEndCol: number;
    moveGrid(direction: string): void;
    makeAMove(x: number, y: number): void;
}

export class AI {
    private maxDepth: number = 5;
    private BAD_MOVE_THRESHOLD: number = -5;

    makeMove(game: GameBrain): void {
        let { move, score } = this.findBestMove(game);

        if (!move || score <= this.BAD_MOVE_THRESHOLD) {
            let possibleDirections = this.getAvailableGridMoves(game);
            if (possibleDirections.length > 0) {
                let randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                game.moveGrid(randomDirection);
            }
        } else {
            game.makeAMove(move.x, move.y);
        }
    }

    private getAvailableGridMoves(game: GameBrain): string[] {
        let directions: string[] = [];

        if (game.gridStartRow > 0) directions.push("up");
        if (game.gridEndRow < 4) directions.push("down");
        if (game.gridStartCol > 0) directions.push("left");
        if (game.gridEndCol < 4) directions.push("right");

        if (game.gridStartRow > 0 && game.gridStartCol > 0) directions.push("up-left");
        if (game.gridStartRow > 0 && game.gridEndCol < 4) directions.push("up-right");
        if (game.gridEndRow < 4 && game.gridStartCol > 0) directions.push("down-left");
        if (game.gridEndRow < 4 && game.gridEndCol < 4) directions.push("down-right");

        return directions;
    }

    private findBestMove(game: GameBrain): { move: Move | null; score: number } {
        let bestScore = -Infinity;
        let bestMove: Move | null = null;

        let moves = this.getAvailableMoves(game);
        for (let move of moves) {
            game.board[move.x][move.y] = "O";
            let score = this.minimax(game, 0, false, -Infinity, Infinity);
            game.board[move.x][move.y] = null;

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return { move: bestMove, score: bestScore };
    }

    private minimax(game: GameBrain, depth: number, isMaximizing: boolean, alpha: number, beta: number): number {
        let winner = this.evaluate(game);
        if (winner !== 0 || depth >= this.maxDepth) return winner;

        let moves = this.getAvailableMoves(game);
        if (moves.length === 0) return 0;

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let move of moves) {
                game.board[move.x][move.y] = "O";
                let status = this.minimax(game, depth + 1, false, alpha, beta);
                game.board[move.x][move.y] = null;

                maxEval = Math.max(maxEval, status);
                alpha = Math.max(alpha, status);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let move of moves) {
                game.board[move.x][move.y] = "X";
                let status = this.minimax(game, depth + 1, true, alpha, beta);
                game.board[move.x][move.y] = null;

                minEval = Math.min(minEval, status);
                beta = Math.min(beta, status);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }

    private evaluate(game: GameBrain): number {
        if (this.checkWin(game, "O")) return 10;
        if (this.checkWin(game, "X")) return -10;
        return 0;
    }

    private getAvailableMoves(game: GameBrain): Move[] {
        let moves: Move[] = [];
        for (let i = game.gridStartRow; i <= game.gridEndRow; i++) {
            for (let j = game.gridStartCol; j <= game.gridEndCol; j++) {
                if (!game.board[i][j]) {
                    moves.push({ x: i, y: j });
                }
            }
        }
        return moves;
    }

    private checkWin(game: GameBrain, player: string): boolean {
        let gridSize = game.gridEndRow - game.gridStartRow + 1;

        for (let i = game.gridStartRow; i <= game.gridEndRow; i++) {
            let win = true;
            for (let j = game.gridStartCol; j <= game.gridEndCol; j++) {
                if (game.board[i][j] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        for (let j = game.gridStartCol; j <= game.gridEndCol; j++) {
            let win = true;
            for (let i = game.gridStartRow; i <= game.gridEndRow; i++) {
                if (game.board[i][j] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        let winMainDiagonal = true;
        for (let i = 0; i < gridSize; i++) {
            if (game.board[game.gridStartRow + i][game.gridStartCol + i] !== player) {
                winMainDiagonal = false;
                break;
            }
        }
        if (winMainDiagonal) return true;

        let winAntiDiagonal = true;
        for (let i = 0; i < gridSize; i++) {
            if (game.board[game.gridStartRow + i][game.gridEndCol - i] !== player) {
                winAntiDiagonal = false;
                break;
            }
        }
        return winAntiDiagonal;
    }
}

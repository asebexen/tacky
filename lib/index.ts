import { Cell, Game, GameState, InitOptions, TackyError, Tile } from "./types"

export const init = (options?: InitOptions): Game => {
    const game: Game = {
        board: Array(9).fill(null),
        moveHistory: [],
        startingPlayer: options?.startingPlayer ?? 'x',
        currentPlayer: options?.startingPlayer ?? 'x',
        state: GameState.InProgress,
        winningLine: null
    };
    return game;
}

const getCell = (game: Game, position: number): {cell: Cell | null, error: TackyError | null} => {
    if (position < 0 || position > 8) {
        return {
            cell: null,
            error: TackyError.PositionOutOfBounds
        };
    }
    return {
        cell: game.board[position],
        error: null
    };
}

const computeGameState = (board: Cell[]): {state: GameState, winningLine: number[] | null} => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    // Return 'x' or 'o' if either has won
    const winningLine = lines.filter(line =>
        line.map(position => board[position])
            .reduce((prev, curr) => prev === curr ? curr : null) !== null
    ).at(0);
    if (winningLine) {
        return {
            state: board[winningLine[0]] === 'x' ? GameState.XWin : GameState.OWin,
            winningLine
        };
    }
    
    return {
        state: board.some(cell => cell === null) ? GameState.InProgress : GameState.Tie,
        winningLine: null
    };
}

export const makeMove = (game: Game, position: number): {game: Game, error: TackyError | null} => {
    const getCellResult = getCell(game, position);
    if (getCellResult.error) {
        return {
            game,
            error: getCellResult.error
        };
    } else if (getCellResult.cell !== null) {
        return {
            game,
            error: TackyError.CellOccupied
        };
    } else if (game.state !== GameState.InProgress) {
        return {
            game,
            error: TackyError.GameEnded
        };
    }
    
    const board = game.board.with(position, game.currentPlayer);
    const moveHistory = game.moveHistory.concat(position);
    const startingPlayer = game.startingPlayer;
    const currentPlayer = game.currentPlayer === 'x' ? 'o' : 'x';
    const {state, winningLine} = computeGameState(board);

    const newGame: Game = {
        board,
        moveHistory,
        startingPlayer,
        currentPlayer,
        state,
        winningLine
    };
    
    return {
        game: newGame,
        error: null
    };
}

const fromHistoryR = (history: number[], game: Game): {game: Game, error: TackyError | null} => {
    if (history.length === 0) {
        return {
            game,
            error: null
        };
    }

    const {game: newGame, error} = makeMove(game, history[0]);
    if (error) {
        return {
            game,
            error
        };
    }

    return fromHistoryR(history.slice(1), newGame);
}

export const fromHistory = (history: number[], startingPlayer?: Tile): {game: Game, error: TackyError | null} => {
    const game = init({startingPlayer});
    return fromHistoryR(history, game);
}
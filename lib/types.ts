export type Tile = 'x' | 'o'
export type Cell = Tile | null;
export enum GameState {
    XWin = 'xwin',
    OWin = 'owin',
    Tie = 'tie',
    InProgress = 'inprogress'
};
export type Game = {
    board: Cell[];
    moveHistory: number[];
    startingPlayer: Tile;
    currentPlayer: Tile;
    state: GameState;
    winningLine: number[] | null;
};

export enum TackyError {
    PositionOutOfBounds = 'PositionOutOfBounds',
    CellOccupied = 'CellOccupied',
    GameEnded = 'GameEnded',
}
export type InitOptions = {
    startingPlayer?: Tile;
}
import { Game, InitOptions, TackyError, Tile } from "./types";
export declare const init: (options?: InitOptions) => Game;
export declare const makeMove: (game: Game, position: number) => {
    game: Game;
    error: TackyError | null;
};
export declare const fromHistory: (history: number[], startingPlayer?: Tile) => {
    game: Game;
    error: TackyError | null;
};

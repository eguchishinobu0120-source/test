// ゲームの型定義

export type Player = 'black' | 'white';
export type Cell = Player | null;
export type Board = Cell[][];

export interface Position {
    row: number;
    col: number;
}

export interface GameState {
    board: Board;
    currentPlayer: Player;
    blackScore: number;
    whiteScore: number;
    validMoves: Position[];
    gameOver: boolean;
    winner: Player | 'draw' | null;
}

export interface Direction {
    row: number;
    col: number;
}

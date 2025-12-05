// ゲームの型定義

export type Player = 'black' | 'white';
export type Cell = Player | null;
export type Board = Cell[][];

export interface Position {
    row: number;
    col: number;
}

export type GameMode = 'pvp' | 'pvc'; // Player vs Player or Player vs CPU
export type CPUDifficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
    board: Board;
    currentPlayer: Player;
    blackScore: number;
    whiteScore: number;
    validMoves: Position[];
    gameOver: boolean;
    winner: Player | 'draw' | null;
    gameMode: GameMode;
    cpuDifficulty: CPUDifficulty;
}

export interface Direction {
    row: number;
    col: number;
}

// オセロゲームのロジック

import type { Board, Player, Position, Direction } from '../types/game';

const BOARD_SIZE = 8;

// 8方向の定義
const DIRECTIONS: Direction[] = [
    { row: -1, col: -1 }, // 左上
    { row: -1, col: 0 },  // 上
    { row: -1, col: 1 },  // 右上
    { row: 0, col: -1 },  // 左
    { row: 0, col: 1 },   // 右
    { row: 1, col: -1 },  // 左下
    { row: 1, col: 0 },   // 下
    { row: 1, col: 1 },   // 右下
];

// 初期ボードの作成
export function createInitialBoard(): Board {
    const board: Board = Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null));

    // 初期配置
    board[3][3] = 'white';
    board[3][4] = 'black';
    board[4][3] = 'black';
    board[4][4] = 'white';

    return board;
}

// ボードが有効な範囲内かチェック
function isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

// 指定方向に反転可能な石があるかチェック
function checkDirection(
    board: Board,
    row: number,
    col: number,
    direction: Direction,
    player: Player
): Position[] {
    const opponent: Player = player === 'black' ? 'white' : 'black';
    const flips: Position[] = [];
    let currentRow = row + direction.row;
    let currentCol = col + direction.col;

    // 隣接セルが相手の石でない場合は反転不可
    if (
        !isValidPosition(currentRow, currentCol) ||
        board[currentRow][currentCol] !== opponent
    ) {
        return [];
    }

    // 相手の石を収集
    while (
        isValidPosition(currentRow, currentCol) &&
        board[currentRow][currentCol] === opponent
    ) {
        flips.push({ row: currentRow, col: currentCol });
        currentRow += direction.row;
        currentCol += direction.col;
    }

    // 最後が自分の石でない場合は反転不可
    if (
        !isValidPosition(currentRow, currentCol) ||
        board[currentRow][currentCol] !== player
    ) {
        return [];
    }

    return flips;
}

// 指定位置に石を置いた場合に反転できる石のリストを取得
export function getFlips(
    board: Board,
    row: number,
    col: number,
    player: Player
): Position[] {
    if (board[row][col] !== null) {
        return [];
    }

    const allFlips: Position[] = [];

    for (const direction of DIRECTIONS) {
        const flips = checkDirection(board, row, col, direction, player);
        allFlips.push(...flips);
    }

    return allFlips;
}

// 有効な手をすべて取得
export function getValidMoves(board: Board, player: Player): Position[] {
    const validMoves: Position[] = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === null) {
                const flips = getFlips(board, row, col, player);
                if (flips.length > 0) {
                    validMoves.push({ row, col });
                }
            }
        }
    }

    return validMoves;
}

// 石を置いてボードを更新
export function makeMove(
    board: Board,
    row: number,
    col: number,
    player: Player
): Board {
    const flips = getFlips(board, row, col, player);

    if (flips.length === 0) {
        return board;
    }

    // 新しいボードを作成（イミュータブル）
    const newBoard = board.map(row => [...row]);

    // 石を置く
    newBoard[row][col] = player;

    // 石を反転
    for (const flip of flips) {
        newBoard[flip.row][flip.col] = player;
    }

    return newBoard;
}

// スコアを計算
export function calculateScore(board: Board): { black: number; white: number } {
    let black = 0;
    let white = 0;

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = board[row][col];
            if (cell === 'black') black++;
            if (cell === 'white') white++;
        }
    }

    return { black, white };
}

// ゲーム終了判定
export function isGameOver(board: Board): boolean {
    const blackMoves = getValidMoves(board, 'black');
    const whiteMoves = getValidMoves(board, 'white');
    return blackMoves.length === 0 && whiteMoves.length === 0;
}

// 勝者を判定
export function getWinner(board: Board): Player | 'draw' | null {
    if (!isGameOver(board)) {
        return null;
    }

    const { black, white } = calculateScore(board);

    if (black > white) return 'black';
    if (white > black) return 'white';
    return 'draw';
}

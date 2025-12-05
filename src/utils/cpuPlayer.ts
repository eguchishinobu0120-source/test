// CPUプレイヤーのAIロジック

import type { Board, Player, Position } from '../types/game';
import { getValidMoves, makeMove, calculateScore } from './gameLogic';

/**
 * CPUの難易度
 */
export type CPUDifficulty = 'easy' | 'medium' | 'hard';

/**
 * ランダムに有効な手を選択（簡単）
 */
function getRandomMove(validMoves: Position[]): Position {
    const randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];
}

/**
 * 評価値を計算（盤面の良さを数値化）
 */
function evaluateBoard(board: Board, player: Player): number {
    const score = calculateScore(board);
    const playerScore = player === 'black' ? score.black : score.white;
    const opponentScore = player === 'black' ? score.white : score.black;

    // 角の重要度を高く評価
    const corners = [
        [0, 0], [0, 7], [7, 0], [7, 7]
    ];
    let cornerBonus = 0;
    corners.forEach(([row, col]) => {
        if (board[row][col] === player) cornerBonus += 25;
        if (board[row][col] === (player === 'black' ? 'white' : 'black')) cornerBonus -= 25;
    });

    // 辺の評価
    const edges = [
        ...Array.from({ length: 8 }, (_, i) => [0, i]),
        ...Array.from({ length: 8 }, (_, i) => [7, i]),
        ...Array.from({ length: 8 }, (_, i) => [i, 0]),
        ...Array.from({ length: 8 }, (_, i) => [i, 7]),
    ];
    let edgeBonus = 0;
    edges.forEach(([row, col]) => {
        if (board[row][col] === player) edgeBonus += 5;
        if (board[row][col] === (player === 'black' ? 'white' : 'black')) edgeBonus -= 5;
    });

    // 可動性（打てる手の数）
    const playerMoves = getValidMoves(board, player).length;
    const opponent: Player = player === 'black' ? 'white' : 'black';
    const opponentMoves = getValidMoves(board, opponent).length;
    const mobilityBonus = (playerMoves - opponentMoves) * 2;

    return (playerScore - opponentScore) + cornerBonus + edgeBonus + mobilityBonus;
}

/**
 * ミニマックス法で最適な手を探索（中級・上級）
 */
function minimax(
    board: Board,
    depth: number,
    alpha: number,
    beta: number,
    maximizingPlayer: boolean,
    player: Player
): number {
    if (depth === 0) {
        return evaluateBoard(board, player);
    }

    const currentPlayer: Player = maximizingPlayer ? player : (player === 'black' ? 'white' : 'black');
    const validMoves = getValidMoves(board, currentPlayer);

    if (validMoves.length === 0) {
        // パスの場合
        return minimax(board, depth - 1, alpha, beta, !maximizingPlayer, player);
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (const move of validMoves) {
            const newBoard = makeMove(board, move.row, move.col, currentPlayer);
            const evaluation = minimax(newBoard, depth - 1, alpha, beta, false, player);
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break; // アルファベータ枝刈り
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of validMoves) {
            const newBoard = makeMove(board, move.row, move.col, currentPlayer);
            const evaluation = minimax(newBoard, depth - 1, alpha, beta, true, player);
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break; // アルファベータ枝刈り
        }
        return minEval;
    }
}

/**
 * 最適な手を選択（中級）
 */
function getBestMove(board: Board, player: Player, depth: number): Position {
    const validMoves = getValidMoves(board, player);
    let bestMove = validMoves[0];
    let bestValue = -Infinity;

    for (const move of validMoves) {
        const newBoard = makeMove(board, move.row, move.col, player);
        const value = minimax(newBoard, depth - 1, -Infinity, Infinity, false, player);
        if (value > bestValue) {
            bestValue = value;
            bestMove = move;
        }
    }

    return bestMove;
}

/**
 * CPUの手を取得
 */
export function getCPUMove(
    board: Board,
    player: Player,
    difficulty: CPUDifficulty = 'medium'
): Position | null {
    const validMoves = getValidMoves(board, player);

    if (validMoves.length === 0) {
        return null; // 打てる手がない
    }

    switch (difficulty) {
        case 'easy':
            // ランダムに選択
            return getRandomMove(validMoves);

        case 'medium':
            // 深さ3のミニマックス
            return getBestMove(board, player, 3);

        case 'hard':
            // 深さ5のミニマックス
            return getBestMove(board, player, 5);

        default:
            return getRandomMove(validMoves);
    }
}

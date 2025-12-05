// オセロゲームの状態管理フック

import { useState, useCallback, useEffect } from 'react';
import type { GameState, Player, Board } from '../types/game';
import {
    createInitialBoard,
    getValidMoves,
    makeMove,
    calculateScore,
    getWinner,
} from '../utils/gameLogic';

export function useOthelloGame() {
    const [board, setBoard] = useState<Board>(createInitialBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
    const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<Player | 'draw' | null>(null);

    // スコアを計算
    const score = calculateScore(board);

    // 有効な手を更新
    useEffect(() => {
        const moves = getValidMoves(board, currentPlayer);
        setValidMoves(moves);

        // 有効な手がない場合、パスまたはゲーム終了
        if (moves.length === 0) {
            const opponent: Player = currentPlayer === 'black' ? 'white' : 'black';
            const opponentMoves = getValidMoves(board, opponent);

            if (opponentMoves.length === 0) {
                // 両者とも手がない場合、ゲーム終了
                setGameOver(true);
                setWinner(getWinner(board));
            } else {
                // 相手にパス
                setTimeout(() => {
                    setCurrentPlayer(opponent);
                }, 1000);
            }
        }
    }, [board, currentPlayer]);

    // 石を置く
    const placePiece = useCallback(
        (row: number, col: number) => {
            if (gameOver) return false;

            // 有効な手かチェック
            const isValidMove = validMoves.some(
                move => move.row === row && move.col === col
            );

            if (!isValidMove) return false;

            // 石を置いてボードを更新
            const newBoard = makeMove(board, row, col, currentPlayer);
            setBoard(newBoard);

            // ターンを交代
            const nextPlayer: Player = currentPlayer === 'black' ? 'white' : 'black';
            setCurrentPlayer(nextPlayer);

            return true;
        },
        [board, currentPlayer, validMoves, gameOver]
    );

    // ゲームをリセット
    const resetGame = useCallback(() => {
        setBoard(createInitialBoard());
        setCurrentPlayer('black');
        setGameOver(false);
        setWinner(null);
    }, []);

    // セルが有効な手かチェック
    const isValidMove = useCallback(
        (row: number, col: number): boolean => {
            return validMoves.some(move => move.row === row && move.col === col);
        },
        [validMoves]
    );

    const gameState: GameState = {
        board,
        currentPlayer,
        blackScore: score.black,
        whiteScore: score.white,
        validMoves,
        gameOver,
        winner,
    };

    return {
        gameState,
        placePiece,
        resetGame,
        isValidMove,
    };
}

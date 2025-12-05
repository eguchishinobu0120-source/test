// オセロゲームの状態管理フック

import { useState, useCallback, useEffect } from 'react';
import type { GameState, Player, Board, GameMode, CPUDifficulty } from '../types/game';
import {
    createInitialBoard,
    getValidMoves,
    makeMove,
    calculateScore,
    getWinner,
} from '../utils/gameLogic';
import { getCPUMove } from '../utils/cpuPlayer';

export function useOthelloGame() {
    const [board, setBoard] = useState<Board>(createInitialBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
    const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<Player | 'draw' | null>(null);
    const [gameMode, setGameMode] = useState<GameMode>('pvc'); // デフォルトでCPU対戦
    const [cpuDifficulty, setCpuDifficulty] = useState<CPUDifficulty>('medium');
    const [isCPUThinking, setIsCPUThinking] = useState(false);

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

    // CPUのターン処理
    useEffect(() => {
        // CPU対戦モードで、白のターンで、ゲームが終了していない場合
        if (gameMode === 'pvc' && currentPlayer === 'white' && !gameOver && validMoves.length > 0) {
            setIsCPUThinking(true);

            // CPUの思考時間をシミュレート（500ms-1000ms）
            const thinkingTime = 500 + Math.random() * 500;

            setTimeout(() => {
                const cpuMove = getCPUMove(board, currentPlayer, cpuDifficulty);

                if (cpuMove) {
                    // CPUが手を打つ
                    const newBoard = makeMove(board, cpuMove.row, cpuMove.col, currentPlayer);
                    setBoard(newBoard);
                    setCurrentPlayer('black'); // プレイヤーのターンに戻す
                }

                setIsCPUThinking(false);
            }, thinkingTime);
        }
    }, [gameMode, currentPlayer, gameOver, validMoves, board, cpuDifficulty]);

    // 石を置く
    const placePiece = useCallback(
        (row: number, col: number) => {
            if (gameOver) return false;

            // CPU対戦モードで白（CPU）のターンの場合は操作不可
            if (gameMode === 'pvc' && currentPlayer === 'white') return false;

            // CPUが思考中の場合は操作不可
            if (isCPUThinking) return false;

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
        [board, currentPlayer, validMoves, gameOver, gameMode, isCPUThinking]
    );

    // ゲームをリセット
    const resetGame = useCallback(() => {
        setBoard(createInitialBoard());
        setCurrentPlayer('black');
        setGameOver(false);
        setWinner(null);
        setIsCPUThinking(false);
    }, []);

    // ゲームモードを変更
    const changeGameMode = useCallback((mode: GameMode) => {
        setGameMode(mode);
        resetGame();
    }, [resetGame]);

    // CPU難易度を変更
    const changeCPUDifficulty = useCallback((difficulty: CPUDifficulty) => {
        setCpuDifficulty(difficulty);
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
        gameMode,
        cpuDifficulty,
    };

    return {
        gameState,
        placePiece,
        resetGame,
        isValidMove,
        changeGameMode,
        changeCPUDifficulty,
        isCPUThinking,
    };
}

import { Player, GameMode, CPUDifficulty } from '../types/game';
import './GameInfo.css';

interface GameInfoProps {
    currentPlayer: Player;
    blackScore: number;
    whiteScore: number;
    gameOver: boolean;
    winner: Player | 'draw' | null;
    gameMode: GameMode;
    cpuDifficulty: CPUDifficulty;
    isCPUThinking: boolean;
    onReset: () => void;
    onGameModeChange: (mode: GameMode) => void;
    onDifficultyChange: (difficulty: CPUDifficulty) => void;
}

export function GameInfo({
    currentPlayer,
    blackScore,
    whiteScore,
    gameOver,
    winner,
    gameMode,
    cpuDifficulty,
    isCPUThinking,
    onReset,
    onGameModeChange,
    onDifficultyChange,
}: GameInfoProps) {
    const getWinnerText = () => {
        if (winner === 'draw') return '引き分け！';
        if (winner === 'black') return '黒の勝利！';
        if (winner === 'white') {
            return gameMode === 'pvc' ? 'CPUの勝利！' : '白の勝利！';
        }
        return '';
    };

    const getCurrentPlayerText = () => {
        if (currentPlayer === 'black') return '黒のターン（あなた）';
        if (gameMode === 'pvc') return 'CPUのターン';
        return '白のターン';
    };

    return (
        <div className="game-info">
            {/* タイトル */}
            <h1 className="game-title">
                <span className="title-main">オセロ</span>
                <span className="title-sub">Premium Othello</span>
            </h1>

            {/* ゲームモード選択 */}
            <div className="game-mode-selector glass">
                <div className="mode-label">ゲームモード</div>
                <div className="mode-buttons">
                    <button
                        className={`mode-button ${gameMode === 'pvp' ? 'mode-active' : ''}`}
                        onClick={() => onGameModeChange('pvp')}
                    >
                        👥 2人対戦
                    </button>
                    <button
                        className={`mode-button ${gameMode === 'pvc' ? 'mode-active' : ''}`}
                        onClick={() => onGameModeChange('pvc')}
                    >
                        🤖 CPU対戦
                    </button>
                </div>
            </div>

            {/* CPU難易度選択 */}
            {gameMode === 'pvc' && (
                <div className="difficulty-selector glass">
                    <div className="difficulty-label">CPU難易度</div>
                    <div className="difficulty-buttons">
                        <button
                            className={`difficulty-button ${cpuDifficulty === 'easy' ? 'difficulty-active' : ''}`}
                            onClick={() => onDifficultyChange('easy')}
                        >
                            簡単
                        </button>
                        <button
                            className={`difficulty-button ${cpuDifficulty === 'medium' ? 'difficulty-active' : ''}`}
                            onClick={() => onDifficultyChange('medium')}
                        >
                            普通
                        </button>
                        <button
                            className={`difficulty-button ${cpuDifficulty === 'hard' ? 'difficulty-active' : ''}`}
                            onClick={() => onDifficultyChange('hard')}
                        >
                            難しい
                        </button>
                    </div>
                </div>
            )}

            {/* スコアボード */}
            <div className="scoreboard glass">
                <div className={`score-item ${currentPlayer === 'black' && !gameOver ? 'score-active' : ''}`}>
                    <div className="score-piece piece-black-indicator"></div>
                    <div className="score-info">
                        <span className="score-label">黒（あなた）</span>
                        <span className="score-value">{blackScore}</span>
                    </div>
                </div>

                <div className="score-divider"></div>

                <div className={`score-item ${currentPlayer === 'white' && !gameOver ? 'score-active' : ''}`}>
                    <div className="score-piece piece-white-indicator"></div>
                    <div className="score-info">
                        <span className="score-label">
                            {gameMode === 'pvc' ? '白（CPU）' : '白'}
                        </span>
                        <span className="score-value">{whiteScore}</span>
                    </div>
                </div>
            </div>

            {/* ゲーム状態 */}
            <div className="game-status glass">
                {gameOver ? (
                    <div className="status-message winner-message">
                        <span className="status-icon">🏆</span>
                        <span className="status-text">{getWinnerText()}</span>
                    </div>
                ) : (
                    <div className="status-message">
                        {isCPUThinking ? (
                            <>
                                <span className="status-text">CPUが考え中</span>
                                <div className="thinking-indicator">
                                    <div className="thinking-dot"></div>
                                    <div className="thinking-dot"></div>
                                    <div className="thinking-dot"></div>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="status-text">{getCurrentPlayerText()}</span>
                                <div className={`turn-indicator turn-${currentPlayer}`}></div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* リセットボタン */}
            <button className="reset-button glass glow-gold" onClick={onReset}>
                <span className="button-icon">🔄</span>
                <span className="button-text">新しいゲーム</span>
            </button>
        </div>
    );
}

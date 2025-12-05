import { Player } from '../types/game';
import './GameInfo.css';

interface GameInfoProps {
    currentPlayer: Player;
    blackScore: number;
    whiteScore: number;
    gameOver: boolean;
    winner: Player | 'draw' | null;
    onReset: () => void;
}

export function GameInfo({
    currentPlayer,
    blackScore,
    whiteScore,
    gameOver,
    winner,
    onReset,
}: GameInfoProps) {
    const getWinnerText = () => {
        if (winner === 'draw') return '引き分け！';
        if (winner === 'black') return '黒の勝利！';
        if (winner === 'white') return '白の勝利！';
        return '';
    };

    return (
        <div className="game-info">
            {/* タイトル */}
            <h1 className="game-title">
                <span className="title-main">オセロ</span>
                <span className="title-sub">Premium Othello</span>
            </h1>

            {/* スコアボード */}
            <div className="scoreboard glass">
                <div className={`score-item ${currentPlayer === 'black' && !gameOver ? 'score-active' : ''}`}>
                    <div className="score-piece piece-black-indicator"></div>
                    <div className="score-info">
                        <span className="score-label">黒</span>
                        <span className="score-value">{blackScore}</span>
                    </div>
                </div>

                <div className="score-divider"></div>

                <div className={`score-item ${currentPlayer === 'white' && !gameOver ? 'score-active' : ''}`}>
                    <div className="score-piece piece-white-indicator"></div>
                    <div className="score-info">
                        <span className="score-label">白</span>
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
                        <span className="status-text">
                            {currentPlayer === 'black' ? '黒' : '白'}のターン
                        </span>
                        <div className={`turn-indicator turn-${currentPlayer}`}></div>
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

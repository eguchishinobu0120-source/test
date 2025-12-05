import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import { useOthelloGame } from './hooks/useOthelloGame';
import './App.css';

function App() {
    const {
        gameState,
        placePiece,
        resetGame,
        isValidMove,
        changeGameMode,
        changeCPUDifficulty,
        isCPUThinking
    } = useOthelloGame();

    const handleCellClick = (row: number, col: number) => {
        placePiece(row, col);
    };

    return (
        <div className="app">
            <div className="app-container">
                <GameInfo
                    currentPlayer={gameState.currentPlayer}
                    blackScore={gameState.blackScore}
                    whiteScore={gameState.whiteScore}
                    gameOver={gameState.gameOver}
                    winner={gameState.winner}
                    gameMode={gameState.gameMode}
                    cpuDifficulty={gameState.cpuDifficulty}
                    isCPUThinking={isCPUThinking}
                    onReset={resetGame}
                    onGameModeChange={changeGameMode}
                    onDifficultyChange={changeCPUDifficulty}
                />
                <Board
                    board={gameState.board}
                    onCellClick={handleCellClick}
                    isValidMove={isValidMove}
                />
            </div>
        </div>
    );
}

export default App;

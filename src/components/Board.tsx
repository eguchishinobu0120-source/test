import { Board as BoardType } from '../types/game';
import { Cell } from './Cell';
import './Board.css';

interface BoardProps {
    board: BoardType;
    onCellClick: (row: number, col: number) => void;
    isValidMove: (row: number, col: number) => boolean;
}

export function Board({ board, onCellClick, isValidMove }: BoardProps) {
    return (
        <div className="board-container">
            <div className="board glass">
                <div className="board-grid">
                    {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                value={cell}
                                isValid={isValidMove(rowIndex, colIndex)}
                                onClick={() => onCellClick(rowIndex, colIndex)}
                                row={rowIndex}
                                col={colIndex}
                            />
                        ))
                    )}
                </div>
                {/* ボードの装飾エッジ */}
                <div className="board-edge board-edge-top"></div>
                <div className="board-edge board-edge-right"></div>
                <div className="board-edge board-edge-bottom"></div>
                <div className="board-edge board-edge-left"></div>
            </div>
        </div>
    );
}

import { Cell as CellType } from '../types/game';
import { Piece } from './Piece';
import './Cell.css';

interface CellProps {
    value: CellType;
    isValid: boolean;
    onClick: () => void;
    row: number;
    col: number;
}

export function Cell({ value, isValid, onClick, row, col }: CellProps) {
    return (
        <div
            className={`cell ${isValid ? 'cell-valid' : ''} ${value ? 'cell-occupied' : ''}`}
            onClick={onClick}
            data-row={row}
            data-col={col}
        >
            {value && <Piece player={value} />}
            {isValid && !value && (
                <div className="valid-move-indicator">
                    <div className="indicator-pulse"></div>
                </div>
            )}
        </div>
    );
}

import { Player } from '../types/game';
import './Piece.css';

interface PieceProps {
    player: Player;
    isNew?: boolean;
}

export function Piece({ player, isNew = false }: PieceProps) {
    return (
        <div className={`piece piece-${player} ${isNew ? 'piece-new' : ''}`}>
            <div className="piece-inner">
                <div className="piece-highlight"></div>
            </div>
        </div>
    );
}

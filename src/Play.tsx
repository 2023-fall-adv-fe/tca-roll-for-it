import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GamePlayer, GameResult, SetupInfo } from "./front-end-model";

interface PlayProps {
    setupInfo: SetupInfo;
    addGameResult: (r: GameResult) => void;
}

enum ShowDrawerReason {
    None
    , ChoosePlayerOrder
    , ScoringCard 
    , EndOfGame
};

export const Play: React.FC<PlayProps> = ({
    setupInfo
    , addGameResult }
) => {

    console.log(setupInfo.start);
    
    const [currentPlayers, setCurrentPlayers] = useState<GamePlayer[]>([]);
    
    const [activePlayer, setActivePlayer] = useState<GamePlayer | undefined>(undefined);

    const showDrawerReason =
        
        // Don't show if active player.
        activePlayer 
            ? ShowDrawerReason.None
            : 
                // If need to pick player order. 
                setupInfo.players.length != currentPlayers.length
                    ? ShowDrawerReason.ChoosePlayerOrder
                    : ShowDrawerReason.None
                
                    // Or pick returned/bumped dice when scoring a card.

                        // Or confirm end of game.
    ;

    const nav = useNavigate();

    const done = (winner: string) => {
        addGameResult({
            winner: winner
            , players: setupInfo.players.map(x => ({
                name: x
                , order: 0
            }))
        });
        nav(-2);
    };

    return (
        <div className="drawer drawer-end">
            <input 
                id="choose-order-drawer" 
                type="checkbox" 
                className="drawer-toggle" 
                checked={showDrawerReason != ShowDrawerReason.None} 
                readOnly
            />
            <div className="drawer-content">
                <div
                    className="flex flex-col p-1"
                >
                    {currentPlayers.map(x => (
                        <div>

                            <h2
                                className="text-xl text-left font-bold"
                            >
                                <span 
                                    className="badge badge-lg w-16 mr-5 bg-primary">
                                        0
                                </span>
                                {x.name}
                            </h2>

                            <button
                                key={x.name}
                                className="btn btn-lg btn-primary capitalize mt-3"
                                onClick={() => done(x.name)}
                            >
                                {x.name} Won
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="cnoose-order-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <p
                        className="text-xl text-left font-bold"
                    >
                        Choose Player {currentPlayers.length + 1}
                    </p>
                    {
                        setupInfo.players
                            .filter(x => !currentPlayers.some(y => y.name == x))
                            .map(x => (
                                <button
                                    className="btn btn-lg btn-primary capitalize mt-3"
                                    key={x}
                                    onClick={() => setCurrentPlayers([
                                            ...currentPlayers
                                            , {
                                                name: x
                                                , order: currentPlayers.length + 1
                                                , turns: []
                                            }
                                        ])
                                    }
                                >
                                    {x}                                    
                                </button>
                            ))
                    }
                </ul>
            </div>
        </div>
    );
};
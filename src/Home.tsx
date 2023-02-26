import { useNavigate } from "react-router-dom";

interface HomeProps {
    leaderBoardData: LeaderboardPlayer[] 
}

export interface LeaderboardPlayer {
    name: string;
    wins: number;
    losses: number;
    avg: string;
}

export const Home: React.FC<HomeProps> = ({leaderBoardData}) => {
    const nav = useNavigate();

    return (
        <div
            className=""
        >
            <div
                className="flex flex-col p-1"
            >
                <br />
                <ul className="steps">
                    <li className="step step-primary">Play</li>
                    <li className="step step-primary">Tap the App</li>
                    <li className="step step-primary">Enjoy Fun Facts</li>
                </ul>
                <br />
                <button 
                    className="btn btn-lg btn-primary capitalize"
                    onClick={() => nav("/setup")}
                >
                    Play Roll for It
                </button>
                <br />
                <div
                    className="flex"
                >
                    <div className="card w-0 bg-base-100 shadow-xl bg-base-200 grow">
                        <div className="card-body">
                            <h2 className="card-title">Leaderboard</h2>

                            <table className="table w-0">
                                <thead>
                                    <tr>
                                        <th>W</th>
                                        <th>L</th>
                                        <th>AVG</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderBoardData.map(x => (
                                        <tr>
                                            <td>{x.wins}</td>
                                            <td>{x.losses}</td>
                                            <td>{x.avg}</td>
                                            <td>{x.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <br />
                <div
                    className="flex"
                >
                    <div className="card w-96 bg-base-100 shadow-xl grow">
                        <div className="card-body">
                            <h2 className="card-title">Average Game Times</h2>
                        </div>
                    </div>
                </div>
                <br />
                <div
                    className="flex"
                >
                    <div className="card w-96 bg-base-100 shadow-xl bg-base-200 grow">
                        <div className="card-body">
                            <h2 className="card-title">Winning Sequences</h2>
                        </div>
                    </div>
                </div>
  
            </div>
      </div>
    );
};
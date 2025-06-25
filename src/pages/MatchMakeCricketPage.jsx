import axios from "axios";
import { useState, useEffect } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";

function MatchMakeCricketPage() {
    const [matches, setMatches] = useState([]);
    const [newMatch, setNewMatch] = useState({
        match_id: "",
        matchday: 0,
        match_date: "",
        status: "live",
        minute: 0,
        added_time: 0,
        sport_category: "cricket",
        teams: {
            away: {
                score: { runs: 0, overs: 0, wickets: 0 },
                captain: "",
                team_name: "",
                team_short: ""
            },
            home: {
                score: { runs: 0, overs: 0, wickets: 0 },
                captain: "",
                team_name: "",
                team_short: ""
            }
        },
        venue: "",
        score: {},
        events: [],
        officials: {}
    });
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const baseUrl = "http://192.168.3.35:8002/sport/api/matches/?sport_category=cricket";
                const response = await axios.get(baseUrl);
                setMatches(response.data);
                console.log("Matches api response:", response.data);
            } catch (error) {
                console.error("Error fetching matches", error);
            } finally {
                setLoadingPage(false);
            }
        };
        fetchMatches();
    }, []);


    const statusOptions = ["upcoming", "finished", "live", "postponed"];
    
    const handleInputChange = (e, team = null, score = null) => {
        const { name, value } = e.target;
        if (team && score) {
            setNewMatch({
                ...newMatch,
                teams: {
                    ...newMatch.teams,
                    [team]: {
                        ...newMatch.teams[team],
                        score: {
                            ...newMatch.teams[team].score,
                            [score]: parseInt(value) || 0
                        }
                    }
                }
            });
        } else if (team) {
            setNewMatch({
                ...newMatch,
                teams: {
                    ...newMatch.teams,
                    [team]: {
                        ...newMatch.teams[team],
                        [name]: value
                    }
                }
            });
        } else {
            setNewMatch({
                ...newMatch,
                [name]: name === "matchday" || name === "minute" || name === "added_time" ? parseInt(value) || 0 : value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const baseUrl = "http://192.168.3.35:8002/sport/api/matches/";
            const response = await axios.post(baseUrl, newMatch);
            setMatches([...matches, response.data]);
            setNewMatch({
                match_id: "",
                matchday: 0,
                match_date: "",
                status: "live",
                minute: 0,
                added_time: 0,
                sport_category: "cricket",
                teams: {
                    away: {
                        score: { runs: 0, overs: 0, wickets: 0 },
                        captain: "",
                        team_name: "",
                        team_short: ""
                    },
                    home: {
                        score: { runs: 0, overs: 0, wickets: 0 },
                        captain: "",
                        team_name: "",
                        team_short: ""
                    }
                },
                venue: "",
                score: {},
                events: [],
                officials: {}
            });
            console.log("Match created:", response.data);
        } catch (error) {
            console.error("Error creating match:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create Cricket Match</h1>

            <div className="mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Match ID"
                        name="match_id"
                        value={newMatch.match_id}
                        onChange={handleInputChange}
                        placeholder="e.g., IPL_2025_M45"
                    />
                    <InputField
                        label="Match Day"
                        name="matchday"
                        type="number"
                        value={newMatch.matchday}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Match Date"
                        name="match_date"
                        type="datetime-local"
                        value={newMatch.match_date}
                        onChange={handleInputChange}
                    />
                    <SelectField
                        label="Status"
                        name="status"
                        value={newMatch.status}
                        onChange={handleInputChange}
                        options={statusOptions}
                    />
                    <InputField
                        label="Venue"
                        name="venue"
                        value={newMatch.venue}
                        onChange={handleInputChange}
                        placeholder="e.g., Eden Gardens"
                    />

                    <h2 className="text-xl font-semibold mt-4">Home Team</h2>
                    <InputField
                        label="Team Name"
                        name="team_name"
                        value={newMatch.teams.home.team_name}
                        onChange={(e) => handleInputChange(e, "home")}
                        placeholder="e.g., Mumbai Indians"
                    />
                    <InputField
                        label="Team Short Name"
                        name="team_short"
                        value={newMatch.teams.home.team_short}
                        onChange={(e) => handleInputChange(e, "home")}
                        placeholder="e.g., MI"
                    />
                    <InputField
                        label="Captain"
                        name="captain"
                        value={newMatch.teams.home.captain}
                        onChange={(e) => handleInputChange(e, "home")}
                        placeholder="e.g., Rohit Sharma"
                    />
                    <InputField
                        label="Runs"
                        name="runs"
                        type="number"
                        value={newMatch.teams.home.score.runs}
                        onChange={(e) => handleInputChange(e, "home", "runs")}
                    />
                    <InputField
                        label="Overs"
                        name="overs"
                        type="number"
                        value={newMatch.teams.home.score.overs}
                        onChange={(e) => handleInputChange(e, "home", "overs")}
                        step="0.1"
                    />
                    <InputField
                        label="Wickets"
                        name="wickets"
                        type="number"
                        value={newMatch.teams.home.score.wickets}
                        onChange={(e) => handleInputChange(e, "home", "wickets")}
                    />

                    <h2 className="text-xl font-semibold mt-4">Away Team</h2>
                    <InputField
                        label="Team Name"
                        name="team_name"
                        value={newMatch.teams.away.team_name}
                        onChange={(e) => handleInputChange(e, "away")}
                        placeholder="e.g., Chennai Super Kings"
                    />
                    <InputField
                        label="Team Short Name"
                        name="team_short"
                        value={newMatch.teams.away.team_short}
                        onChange={(e) => handleInputChange(e, "away")}
                        placeholder="e.g., CSK"
                    />
                    <InputField
                        label="Captain"
                        name="captain"
                        value={newMatch.teams.away.captain}
                        onChange={(e) => handleInputChange(e, "away")}
                        placeholder="e.g., MS Dhoni"
                    />
                    <InputField
                        label="Runs"
                        name="runs"
                        type="number"
                        value={newMatch.teams.away.score.runs}
                        onChange={(e) => handleInputChange(e, "away", "runs")}
                    />
                    <InputField
                        label="Overs"
                        name="overs"
                        type="number"
                        value={newMatch.teams.away.score.overs}
                        onChange={(e) => handleInputChange(e, "away", "overs")}
                        step="0.1"
                    />
                    <InputField
                        label="Wickets"
                        name="wickets"
                        type="number"
                        value={newMatch.teams.away.score.wickets}
                        onChange={(e) => handleInputChange(e, "away", "wickets")}
                    />

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create Match
                    </button>
                </form>
            </div>

            <h2 className="text-xl font-semibold mt-8">Existing Matches</h2>
            <div className="border p-4 rounded">
                {loadingPage ? (
                    <p>Loading matches...</p>
                ) : (
                    matches.map((match) => (
                        <div key={match.id} className="border-b py-2">
                            <p><strong>{match.teams.home.team_short} vs {match.teams.away.team_short}</strong></p>
                            <p>Venue: {match.venue}</p>
                            <p>Date: {new Date(match.match_date).toLocaleString()}</p>
                            <p>Status: {match.status}</p>
                            <p>Home: {match.teams.home.score.runs}/{match.teams.home.score.wickets} ({match.teams.home.score.overs} overs)</p>
                            <p>Away: {match.teams.away.score.runs}/{match.teams.away.score.wickets} ({match.teams.away.score.overs} overs)</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MatchMakeCricketPage;
import axios from "axios";
import { useState, useEffect } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
import ButtonCreate from "../components/ui/ButtonCreate";

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


    const statusOptions = ["scheduled", "finished", "live", "postponed"];

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
            <form onSubmit={handleSubmit} className="space-y-4 rounded-md p-6 m-3 bg-gray-800">
                <div className="mb-8 grid grid-cols-3 gap-7">
                    <div>
                        <h2 className="text-xl font-semibold mt-4">Match Info</h2>
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
                        /></div>
                    <div><h2 className="text-xl font-semibold mt-4">Home Team</h2>
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
                        /></div>
                    <div><h2 className="text-xl font-semibold mt-4">Away Team</h2>
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
                        /></div>
                </div>
                <ButtonCreate label={'Create Match'} />
            </form>



            <h2 className="text-xl font-semibold mt-8">Existing Matches</h2>
            <div className="space-y-4 p-4">
                {loadingPage ? (
                    <div className="text-center text-gray-300">Loading matches...</div>
                ) : (
                    matches.map((match) => (
                        <div
                            key={match.id}
                            className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-4 hover:bg-gray-700 transition duration-300"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold text-white">
                                    {match.teams.home.team_short} vs {match.teams.away.team_short}
                                </h2>
                                <span className="text-sm text-gray-400">{new Date(match.match_date).toLocaleString()}</span>
                            </div>
                            <div className="text-gray-300 space-y-1 text-sm">
                                <p><span className="font-medium">Venue:</span> {match.venue}</p>
                                <p><span className="font-medium">Status:</span> {match.status}</p>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <p className="text-white font-medium">Home</p>
                                        <p>
                                            {match.teams.home.score.runs}/{match.teams.home.score.wickets} (
                                            {match.teams.home.score.overs} overs)
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Away</p>
                                        <p>
                                            {match.teams.away.score.runs}/{match.teams.away.score.wickets} (
                                            {match.teams.away.score.overs} overs)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default MatchMakeCricketPage;
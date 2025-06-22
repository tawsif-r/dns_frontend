// first import 
// make useeffect where you fetch the stuff
// display the information you fetched.
// post new data into matches

import axios from "axios";
import { useState, useEffect } from "react";

function MatchMakePage() {
    // make useStates for matches
    const [matches, setMatches] = useState([]);
    //"id": 3,
        // "match_id": "EPL_2024_25_M381",
        // "matchday": 24,
        // "match_date": "2025-06-25T11:00:00Z",
        // "status": "UPCOMING",
        // "minute": 15,
        // "added_time": null,
        // "sport_category": "football",
        // "teams": {
        //     "teams": {
        //         "away": {
        //             "manager": "Casa",
        //             "team_id": "WEST_2024",
        //             "formation": "4-5-1",
        //             "team_name": "West Ham",
        //             "team_short": "HAM"
        //         },
        //         "home": {
        //             "manager": "Kaka",
        //             "team_id": "BRI_2024",
        //             "formation": "4-3-3",
        //             "team_name": "Brighton",
        //             "team_short": "BRI"
        //         }
        //     }
        // },
        // "venue": {
        //     "venue": {
        //         "city": "London",
        //         "country": "England",
        //         "stadium": "Ethihad Stadium",
        //         "weather": {
        //             "humidity": "45%",
        //             "condition": "Sunny",
        //             "temperature": "28°C"
        //         },
        //         "capacity": 60704
        //     }
        // },
        // "score": {
        //     "away": 0,
        //     "home": 1,
        //     "penalty": {
        //         "away": 0,
        //         "home": 0
        //     },
        //     "fulltime": {
        //         "away": 0,
        //         "home": 1
        //     },
        //     "halftime": {
        //         "away": 0,
        //         "home": 0
        //     }
        // },
        // "events": null,
        // "officials": null,
        // "created_at": null,
        // "updated_at": "2025-06-19T07:46:20.860011Z",
        // "tournament_id": "EPL_2024_25"
    const [newMatch, setNewMatch] = useState({
        match_id : '',
        matchday : '',
        match_date: "",
        status: "",
        minute: "",
        added_time: "",
        sport_category: "",
        teams: {
            teams: {
                away: {
                    manager: "",
                    team_id: "WEST_2024",
                    formation: "4-5-1",
                    team_name: "West Ham",
                    team_short: "HAM"
                },
                home: {
                    manager: "Kaka",
                    team_id: "BRI_2024",
                    formation: "4-3-3",
                    team_name: "Brighton",
                    team_short: "BRI"
                }
            }
        },
        venue: {
            venue: {
                city: "London",
                country: "England",
                stadium: "Ethihad Stadium",
                weather: {
                    "humidity": "45%",
                    "condition": "Sunny",
                    "temperature": "28°C"
                },
                "capacity": 60704
            }
        },
        "score": {
            "away": 0,
            "home": 1,
            "penalty": {
                "away": 0,
                "home": 0
            },
            "fulltime": {
                "away": 0,
                "home": 1
            },
            "halftime": {
                "away": 0,
                "home": 0
            }
        },
        "events": null,
        "officials": null,
        "created_at": null,
        "updated_at": "2025-06-19T07:46:20.860011Z",
        "tournament_id": "EPL_2024_25"

    });
    const [loadingPage, setLoadingPage] = useState(true);
    // use effect
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const baseUrl = "http://192.168.3.35:8002/sport/api/matches/"
                const response = await axios.get(baseUrl);
                setMatches(response.data);
                console.log("Matches api respnse:", response.data)
            }
            catch (error) {
                console.error("Error fetching matches", error)
            }
            finally {
                setLoadingPage(false)
            }
        };
        fetchMatches();
    }, []);
    return (
        <div>
            Match Make page
        <div className="border">
            {matches.map((match) => (
                <div key={match.id}>
                    <p>id: {match.id}</p>
                    <p>match id: {match.match_id}</p>
                    <p>======================================</p>
                </div>
            ))}

        </div>
        </div>
    )
}

export default MatchMakePage;
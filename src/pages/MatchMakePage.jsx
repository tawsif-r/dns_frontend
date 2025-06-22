// first import 
// make useeffect where you fetch the stuff
// display the information you fetched.
// post new data into matches

import axios from "axios";
import { useState, useEffect } from "react";

function MatchMakePage() {
    // make useStates for matches
    const [matches, setMatches] = useState([]);
    const [newMatch, setNewMatch] = useState({});
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
    }, []
    );
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
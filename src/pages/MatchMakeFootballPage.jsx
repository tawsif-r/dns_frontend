import axios from "axios";
import { useState, useEffect } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
//('scheduled', 'Scheduled'),
// ('live', 'Live'),
// ('halftime', 'Halftime'),
// ('finished', 'Finished'),
// ('postponed', 'Postponed')

function FootballMatchMakePage() {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatchFootball] = useState({
    match_id: "",
    matchday: 0,
    match_date: "",
    status: "live",
    minute: 0,
    added_time: 0,
    sport_category: "football",
    teams: {
      away: {
        manager: "",
        team_id: "",
        formation: "",
        team_name: "",
        team_short: ""
      },
      home: {
        manager: "",
        team_id: "",
        formation: "",
        team_name: "",
        team_short: ""
      }
    },
    venue: {
      city: "",
      country: "",
      stadium: "",
      weather: {
        humidity: "",
        condition: "",
        temperature: ""
      },
      capacity: 0
    },
    score: {
      away: 0,
      home: 0,
      penalty: { away: 0, home: 0 },
      fulltime: { away: 0, home: 0 },
      halftime: { away: 0, home: 0 }
    },
    events: [],
    officials: {},
    tournament_id: ""
  });

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const baseUrl = "http://192.168.3.35:8002/sport/api/matches/?sport_category=football";
        const response = await axios.get(baseUrl);
        setMatches(response.data);
        console.log("Matches API response:", response.data);
      } catch (error) {
        console.error("Error fetching matches", error);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchMatches();
  }, []);

  const handleInputChange = (e, team = null, score = null, venue = null, weather = null) => {
    const { name, value } = e.target;

    if (team && score) {
      setNewMatchFootball({
        ...newMatch,
        score: {
          ...newMatch.score,
          [score]: parseInt(value) || 0
        }
      });
    } else if (team) {
      setNewMatchFootball({
        ...newMatch,
        teams: {
          ...newMatch.teams,
          [team]: {
            ...newMatch.teams[team],
            [name]: value
          }
        }
      });
    } else if (venue && weather) {
      setNewMatchFootball({
        ...newMatch,
        venue: {
          ...newMatch.venue,
          weather: {
            ...newMatch.venue.weather,
            [weather]: value
          }
        }
      });
    } else if (venue) {
      setNewMatchFootball({
        ...newMatch,
        venue: {
          ...newMatch.venue,
          [name]: name === "capacity" ? parseInt(value) || 0 : value
        }
      });
    } else {
      setNewMatchFootball({
        ...newMatch,
        [name]: ["matchday", "minute", "added_time"].includes(name)
          ? parseInt(value) || 0
          : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = "http://192.168.3.35:8002/sport/api/matches/";
      const response = await axios.post(baseUrl, newMatch);
      setMatches([...matches, response.data]);
      resetForm();
      console.log("Match created:", response.data);
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };

  const resetForm = () => {
    setNewMatchFootball({
      match_id: "",
      matchday: 0,
      match_date: "",
      status: "live",
      minute: 0,
      added_time: 0,
      sport_category: "football",
      teams: {
        away: {
          manager: "",
          team_id: "",
          formation: "",
          team_name: "",
          team_short: ""
        },
        home: {
          manager: "",
          team_id: "",
          formation: "",
          team_name: "",
          team_short: ""
        }
      },
      venue: {
        city: "",
        country: "",
        stadium: "",
        weather: {
          humidity: "",
          condition: "",
          temperature: ""
        },
        capacity: 0
      },
      score: {
        away: 0,
        home: 0,
        penalty: { away: 0, home: 0 },
        fulltime: { away: 0, home: 0 },
        halftime: { away: 0, home: 0 }
      },
      events: [],
      officials: {},
      tournament_id: ""
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Football Match</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-5 gap-2">
          <div>{/* Match Info */}
            <h2 className="text-xl font-semibold mt-4">Match</h2>
            <InputField label="Match ID" name="match_id" value={newMatch.match_id} onChange={handleInputChange} />
            <InputField label="Match Day" name="matchday" value={newMatch.matchday} onChange={handleInputChange} type="number" />
            <InputField label="Match Date" name="match_date" value={newMatch.match_date} onChange={handleInputChange} type="datetime-local" />
            <SelectField label="Status" name="status" value={newMatch.status} onChange={handleInputChange} options={["halftime", "live", "finished", "postponed"]} />
            <InputField label="Tournament ID" name="tournament_id" value={newMatch.tournament_id} onChange={handleInputChange} />
          </div>
          <div>{/* Venue */}
            <h2 className="text-xl font-semibold mt-4">Venue</h2>
            <InputField label="Stadium" name="stadium" value={newMatch.venue.stadium} onChange={(e) => handleInputChange(e, null, null, "venue")} />
            <InputField label="City" name="city" value={newMatch.venue.city} onChange={(e) => handleInputChange(e, null, null, "venue")} />
            <InputField label="Country" name="country" value={newMatch.venue.country} onChange={(e) => handleInputChange(e, null, null, "venue")} />
            <InputField label="Capacity" name="capacity" value={newMatch.venue.capacity} onChange={(e) => handleInputChange(e, null, null, "venue")} type="number" />
            <InputField label="Weather Condition" name="condition" value={newMatch.venue.weather.condition} onChange={(e) => handleInputChange(e, null, null, "venue", "weather")} />
            <InputField label="Temperature" name="temperature" value={newMatch.venue.weather.temperature} onChange={(e) => handleInputChange(e, null, null, "venue", "weather")} />
            <InputField label="Humidity" name="humidity" value={newMatch.venue.weather.humidity} onChange={(e) => handleInputChange(e, null, null, "venue", "weather")} /></div>
          <div>{/* Home Team */}
            <TeamSection title="Home Team" teamKey="home" match={newMatch} handleInputChange={handleInputChange} />
          </div>
          <div>{/* Away Team */}
            <TeamSection title="Away Team" teamKey="away" match={newMatch} handleInputChange={handleInputChange} />
          </div>
          <div>{/* Away Team */}
            <TeamSection title="Away Team" teamKey="away" match={newMatch} handleInputChange={handleInputChange} /></div>
          </div>








        {/* Score */}
        <InputField label="Goals (Home)" name="home" value={newMatch.score.home} onChange={(e) => handleInputChange(e, null, "home")} type="number" />
        <InputField label="Goals (Away)" name="away" value={newMatch.score.away} onChange={(e) => handleInputChange(e, null, "away")} type="number" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Match
        </button>
      </form>

      {/* Existing Matches List */}
      <h2 className="text-xl font-semibold mt-8">Existing Matches</h2>
      <div className="border p-4 rounded">
        {loadingPage ? (
          <p>Loading matches...</p>
        ) : (
          matches.map((match) => (
            <div key={match.id} className="border-b py-2">
              <p><strong>{match.teams?.home?.team_short ?? 'N/A'} vs {match.teams?.away?.team_short ?? 'N/A'}</strong></p>
              <p>Venue: {match.venue?.stadium ?? 'N/A'}, {match.venue?.city ?? 'N/A'}, {match.venue?.country ?? 'N/A'}</p>
              <p>Date: {new Date(match.match_date).toLocaleString()}</p>
              <p>Status: {match.status}</p>
              <p>Score: {match.teams?.home?.team_short ?? 'N/A'} {match.score?.home ?? 0} - {match.score?.away ?? 0} {match.teams?.away?.team_short ?? 'N/A'}</p>
              <p>Halftime: {match.score?.halftime?.home ?? 'N/A'} - {match.score?.halftime?.away ?? 'N/A'}</p>
              <p>Fulltime: {match.score?.fulltime?.home ?? 'N/A'} - {match.score?.fulltime?.away ?? 'N/A'}</p>
              <p>Weather: {match.venue?.weather?.condition ?? 'N/A'}, {match.venue?.weather?.temperature ?? 'N/A'}, {match.venue?.weather?.humidity ?? 'N/A'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


// Team Section Component
const TeamSection = ({ title, teamKey, match, handleInputChange }) => {
  const team = match.teams[teamKey];

  return (
    <>
      <h2 className="text-xl font-semibold mt-4">{title}</h2>
      <InputField label="Team Name" name="team_name" value={team.team_name} onChange={(e) => handleInputChange(e, teamKey)} />
      <InputField label="Team Short Name" name="team_short" value={team.team_short} onChange={(e) => handleInputChange(e, teamKey)} />
      <InputField label="Team ID" name="team_id" value={team.team_id} onChange={(e) => handleInputChange(e, teamKey)} />
      <InputField label="Manager" name="manager" value={team.manager} onChange={(e) => handleInputChange(e, teamKey)} />
      <InputField label="Formation" name="formation" value={team.formation} onChange={(e) => handleInputChange(e, teamKey)} />
    </>
  );
};

export default FootballMatchMakePage;
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import './Leaderboard.css'; // Import the CSS file
const url = "https://profound-energy-production.up.railway.app"

const socket = io(url); // Replace with your backend URL

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch initial leaderboard data
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(url+"/teams/leaderboard");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchLeaderboard();

    // Listen for updates
    socket.on("teamUpdated", (teams) => {
      setTeams(teams);
      console.log(teams);
    });

    // Clean up on unmount
    return () => {
      socket.off("teamUpdated");
    };
  }, []);

  const incrementWins = async (id) => {
    try {
      const response = await fetch(
        url+`/teams/${id}/increment`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Failed to increment wins:", error);
    }
  };

  return (
    <div className="leaderboard-container">
      <h1>Kolpa D'or Weekly</h1>
      <ul className="leaderboard-list">
        {teams.map((team) => (
          <li key={team._id} className="leaderboard-item">
            <span>{team.name} - Kolpa sayısı: {team.wins}</span>
            <button className="leaderboard-button" onClick={() => incrementWins(team._id)}>
              Kolpa sıktı
            </button>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Leaderboard;

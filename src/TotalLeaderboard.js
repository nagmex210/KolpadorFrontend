import React, { useEffect, useState } from 'react';
import './Leaderboard.css'; // Import the CSS file
const url = "https://profound-energy-production.up.railway.app"


const TotalLeaderboard = () => {
  const [totalTeams, setTotalTeams] = useState([]);

  useEffect(() => {
    // Fetch total leaderboard data
    const fetchTotalLeaderboard = async () => {
      try {
        const response = await fetch(url+'/teams/leaderboardTotal');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalTeams(data);
      } catch (error) {
        console.error('Failed to fetch total leaderboard:', error);
      }
    };

    fetchTotalLeaderboard();
  }, []);

  return (
    <div className="total-leaderboard-container">
      <h2>Kolpa D'or Ranking</h2>
      <ul className="total-leaderboard-list">
        {totalTeams.map((team) => (
          <li key={team._id} className="total-leaderboard-item">
            <span>{team.name} - Total kazanılan Hafta: {team.winsTotal}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalLeaderboard;

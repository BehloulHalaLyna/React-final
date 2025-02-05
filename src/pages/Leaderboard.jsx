import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    console.log("📊 Scores récupérés :", storedScores); 
    setScores(storedScores);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-4xl w-full bg-opacity-10 backdrop-blur-lg border border-gray-600 p-8 rounded-2xl shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-cyan-400">🏆 Classement</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-cyan-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
          >
            Nouvelle Partie
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-cyan-400">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Rang</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Joueur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Difficulté</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {scores.length > 0 ? (
                scores.map((score, index) => (
                  <tr key={index} className="bg-gray-800 text-white">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{score.playerName || "Joueur Anonyme"}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-cyan-400">{score.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {score.difficulty === 'easy' ? 'Facile' :
                       score.difficulty === 'medium' ? 'Moyen' :
                       score.difficulty === 'hard' ? 'Difficile' : 'Toute'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {score.date ? new Date(score.date).toLocaleDateString('fr-FR') : "Non Disponible"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-cyan-400">
                    Aucun score enregistré.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

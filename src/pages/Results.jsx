import { useNavigate, useLocation } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { saveScore } from '../api/quizApi';

export const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, resetQuiz, playerName } = useQuiz();
  const { category, difficulty } = location.state || {};

  const handleSaveScore = () => {
    saveScore(playerName, score, category, difficulty);
    navigate('/leaderboard');
  };

  const handlePlayAgain = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-md w-full bg-opacity-10 backdrop-blur-lg border border-gray-600 p-8 rounded-2xl shadow-2xl text-white text-center">
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-4">Quiz Terminé!</h1>
        <p className="text-2xl mb-2">Félicitations, {playerName}!</p>
        <p className="text-xl mb-6 text-cyan-300">Votre score final: {score}</p>
        
        <div className="space-y-4">
          <button
            onClick={handleSaveScore}
            className="w-full px-6 py-3 bg-green-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Sauvegarder le Score & Voir le Classement
          </button>
          <button
            onClick={handlePlayAgain}
            className="w-full px-6 py-3 bg-cyan-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
};
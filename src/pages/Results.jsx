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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Terminé!</h1>
      <p className="text-xl mb-2">Félicitations, {playerName}!</p>
      <p className="text-xl mb-6">Votre score final: {score}</p>
      
      <div className="space-y-3">
        <button
          onClick={handleSaveScore}
          className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Sauvegarder le Score & Voir le Classement
        </button>
        <button
          onClick={handlePlayAgain}
          className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
};
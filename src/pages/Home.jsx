import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategorySelect } from '../components/CategorySelect';
import { useQuiz } from '../context/QuizContext';

export const Home = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const { setPlayerName } = useQuiz();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) {
      alert('Veuillez entrer votre nom');
      return;
    }
    setPlayerName(name);
    navigate('/quiz', { state: { category, difficulty } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-md w-full bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-600 p-8 text-white relative">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-cyan-400">Jeu de Quiz</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-300">Votre Nom:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-cyan-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Entrez votre nom"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Sélectionnez une Catégorie:</label>
            <CategorySelect onSelect={setCategory} />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Sélectionnez la Difficulté:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-cyan-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Toute Difficulté</option>
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleStart}
              className="w-full px-6 py-3 bg-cyan-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
            >
              Commencer le Quiz
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="w-full px-6 py-3 bg-gray-700 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
            >
              Voir le Classement
            </button>
          </div>
        </div>
        </div>
    </div>
  );
};
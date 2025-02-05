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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Jeu de Quiz</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Votre Nom:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Sélectionnez une Catégorie:</label>
          <CategorySelect onSelect={setCategory} />
        </div>

        <div>
          <label className="block mb-2">Sélectionnez la Difficulté:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border rounded-lg"
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
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Commencer le Quiz
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
          >
            Voir le Classement
          </button>
        </div>
      </div>
    </div>
  );
};
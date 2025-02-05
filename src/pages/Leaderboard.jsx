import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../api/quizApi';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const { data: scores = [], isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
  });

  if (isLoading) return <div>Chargement du classement...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Classement</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Nouvelle Partie
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joueur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulté
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scores.map((score, index) => (
                <tr key={score.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {score.playerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {score.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {score.difficulty === 'easy' ? 'Facile' :
                     score.difficulty === 'medium' ? 'Moyen' :
                     score.difficulty === 'hard' ? 'Difficile' : 'Toute'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(score.date).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/quizApi';

export const CategorySelect = ({ onSelect }) => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) return <div className="text-cyan-400 text-center">Chargement des catégories...</div>;
  if (error) return <div className="text-red-500 text-center">Erreur de chargement des catégories: {error.message}</div>;

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="w-full p-3 bg-gray-800 border border-cyan-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      <option value="">Toute Catégorie</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id} className="bg-gray-900 text-white">
          {category.name}
        </option>
      ))}
    </select>
  );
};
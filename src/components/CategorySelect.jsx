import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/quizApi';

export const CategorySelect = ({ onSelect }) => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) return <div>Chargement des catégories...</div>;
  if (error) return <div>Erreur de chargement des catégories: {error.message}</div>;

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="w-full p-2 border rounded-lg"
    >
      <option value="">Toute Catégorie</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
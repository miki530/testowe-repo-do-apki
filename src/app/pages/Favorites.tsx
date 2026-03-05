import { Link } from 'react-router';
import { Heart, Plus } from 'lucide-react';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/RecipeCard';

export function Favorites() {
  const { recipes, toggleFavorite } = useRecipes();
  const favorites = recipes.filter(r => r.isFavorite);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mt-0.5" style={{ background: '#fef2f2' }}>
            <Heart className="w-5 h-5" style={{ color: '#ef4444', fill: '#ef4444' }} />
          </div>
          <div>
            <h1 style={{ color: '#1c0a00' }}>Ulubione przepisy</h1>
            <p style={{ color: '#9e7b6b' }}>
              {favorites.length > 0 ? `${favorites.length} ulubionych przepisów` : 'Nie masz jeszcze ulubionych'}
            </p>
          </div>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: '#fef2f2' }}>
            <Heart className="w-10 h-10" style={{ color: '#fca5a5' }} />
          </div>
          <h2 style={{ color: '#1c0a00', marginBottom: '0.5rem' }}>Brak ulubionych</h2>
          <p className="mb-5" style={{ color: '#9e7b6b' }}>
            Kliknij serduszko na karcie przepisu, aby dodać do ulubionych.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            Przeglądaj przepisy
          </Link>
        </div>
      )}
    </div>
  );
}

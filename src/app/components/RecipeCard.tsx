import { Link } from 'react-router';
import { Clock, Users, Heart, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { getCategoryEmoji } from '../hooks/useCategories';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
}

const difficultyColor: Record<string, string> = {
  łatwy: '#16a34a',
  średni: '#d97706',
  trudny: '#dc2626',
};

const difficultyBg: Record<string, string> = {
  łatwy: '#f0fdf4',
  średni: '#fffbeb',
  trudny: '#fef2f2',
};

export function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-50 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
      {/* Image */}
      <Link to={`/przepis/${recipe.id}`} className="block relative overflow-hidden" style={{ height: '180px' }}>
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: '#fef3e2' }}>
            <ChefHat className="w-12 h-12" style={{ color: '#fdba74' }} />
          </div>
        )}
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', color: '#7c3d12', fontWeight: 600 }}
        >
          {getCategoryEmoji(recipe.category)} {recipe.category}
        </div>
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(recipe.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-90"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}
          aria-label={recipe.isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <Heart
            className="w-4 h-4"
            style={{ color: recipe.isFavorite ? '#ef4444' : '#cbd5e1', fill: recipe.isFavorite ? '#ef4444' : 'none' }}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/przepis/${recipe.id}`}>
          <h3 className="mb-1 line-clamp-1 hover:text-orange-600 transition-colors" style={{ color: '#1c0a00' }}>
            {recipe.title}
          </h3>
        </Link>
        <p className="text-sm line-clamp-2 mb-3 flex-1" style={{ color: '#9e7b6b' }}>
          {recipe.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs" style={{ color: '#9e7b6b' }}>
              <Clock className="w-3.5 h-3.5" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1 text-xs" style={{ color: '#9e7b6b' }}>
              <Users className="w-3.5 h-3.5" />
              <span>{recipe.servings} os.</span>
            </div>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              color: difficultyColor[recipe.difficulty],
              background: difficultyBg[recipe.difficulty],
              fontWeight: 600,
            }}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {recipe.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: '#fef3e2', color: '#c2410c' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
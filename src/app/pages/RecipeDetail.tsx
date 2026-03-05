import { useParams, useNavigate, Link } from 'react-router';
import {
  Clock, Users, Heart, ChefHat, ArrowLeft, Edit, Trash2,
  Timer, CheckCircle2, Circle, ShoppingCart, Check
} from 'lucide-react';
import { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { useShoppingList } from '../hooks/useShoppingList';

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

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipe, toggleFavorite, deleteRecipe } = useRecipes();
  const { addItems } = useShoppingList();

  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const recipe = id ? getRecipe(id) : null;

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: '#fef3e2' }}>
          <ChefHat className="w-10 h-10" style={{ color: '#fdba74' }} />
        </div>
        <h2 style={{ color: '#1c0a00', marginBottom: '0.5rem' }}>Nie znaleziono przepisu</h2>
        <Link to="/" className="text-sm mt-2" style={{ color: '#ea580c' }}>
          ← Wróć do listy
        </Link>
      </div>
    );
  }

  const toggleStep = (i: number) => {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleIngredient = (i: number) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleDelete = () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    deleteRecipe(recipe.id);
    navigate('/');
  };

  const handleAddToShoppingList = () => {
    addItems(recipe.ingredients, { id: recipe.id, name: recipe.title });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 mb-6 text-sm hover:opacity-70 transition-opacity"
        style={{ color: '#9e7b6b' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Powrót
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left col */}
        <div className="lg:col-span-1">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden mb-5 relative" style={{ height: '280px' }}>
            {recipe.image ? (
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: '#fef3e2' }}>
                <ChefHat className="w-16 h-16" style={{ color: '#fdba74' }} />
              </div>
            )}
          </div>

          {/* Quick info */}
          <div className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm mb-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-3 rounded-xl" style={{ background: '#fef3e2' }}>
                <Clock className="w-5 h-5 mb-1" style={{ color: '#f97316' }} />
                <span className="text-xs mb-0.5" style={{ color: '#9e7b6b' }}>Przygotowanie</span>
                <span className="text-sm" style={{ color: '#1c0a00', fontWeight: 600 }}>{recipe.prepTime} min</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl" style={{ background: '#fef3e2' }}>
                <Timer className="w-5 h-5 mb-1" style={{ color: '#f97316' }} />
                <span className="text-xs mb-0.5" style={{ color: '#9e7b6b' }}>Gotowanie</span>
                <span className="text-sm" style={{ color: '#1c0a00', fontWeight: 600 }}>{recipe.cookTime} min</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl" style={{ background: '#fef3e2' }}>
                <Users className="w-5 h-5 mb-1" style={{ color: '#f97316' }} />
                <span className="text-xs mb-0.5" style={{ color: '#9e7b6b' }}>Porcje</span>
                <span className="text-sm" style={{ color: '#1c0a00', fontWeight: 600 }}>{recipe.servings} os.</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl" style={{ background: difficultyBg[recipe.difficulty] ?? '#fef3e2' }}>
                <ChefHat className="w-5 h-5 mb-1" style={{ color: difficultyColor[recipe.difficulty] ?? '#f97316' }} />
                <span className="text-xs mb-0.5" style={{ color: '#9e7b6b' }}>Trudność</span>
                <span className="text-sm capitalize" style={{ color: difficultyColor[recipe.difficulty] ?? '#f97316', fontWeight: 600 }}>{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {recipe.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: '#fef3e2', color: '#c2410c' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-sm transition-all"
              style={{
                borderColor: recipe.isFavorite ? '#fca5a5' : '#fed7aa',
                background: recipe.isFavorite ? '#fef2f2' : '#fff',
                color: recipe.isFavorite ? '#ef4444' : '#7c3d12',
              }}
            >
              <Heart className="w-4 h-4" style={{ fill: recipe.isFavorite ? '#ef4444' : 'none' }} />
              {recipe.isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            </button>
            <Link
              to={`/edytuj/${recipe.id}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            >
              <Edit className="w-4 h-4" />
              Edytuj przepis
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-sm transition-all"
              style={{
                borderColor: confirmDelete ? '#fca5a5' : '#fed7aa',
                background: confirmDelete ? '#fef2f2' : '#fff',
                color: confirmDelete ? '#dc2626' : '#9e7b6b',
              }}
            >
              <Trash2 className="w-4 h-4" />
              {confirmDelete ? 'Potwierdź usunięcie' : 'Usuń przepis'}
            </button>
            {confirmDelete && (
              <button onClick={() => setConfirmDelete(false)} className="text-xs text-center py-1" style={{ color: '#9e7b6b' }}>
                Anuluj
              </button>
            )}
          </div>
          <p className="text-xs mt-4 text-center" style={{ color: '#c4a99a' }}>
            Dodano: {formatDate(recipe.createdAt)}
          </p>
        </div>

        {/* Right col */}
        <div className="lg:col-span-2">
          <div className="mb-2">
            <span className="text-sm px-3 py-1 rounded-full" style={{ background: '#fef3e2', color: '#c2410c', fontWeight: 600 }}>
              {recipe.category}
            </span>
          </div>
          <h1 className="mt-2 mb-3" style={{ color: '#1c0a00' }}>{recipe.title}</h1>
          <p className="mb-7" style={{ color: '#7c5c4e', lineHeight: 1.7 }}>{recipe.description}</p>

          {/* Ingredients */}
          <div className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <h2 style={{ color: '#1c0a00' }}>Składniki</h2>
                <span className="text-xs py-0.5 px-2 rounded-full" style={{ background: '#fef3e2', color: '#c2410c' }}>
                  {recipe.ingredients.length} pozycji
                </span>
              </div>

              {/* Add to shopping list button */}
              <button
                onClick={handleAddToShoppingList}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all active:scale-95"
                style={
                  addedToCart
                    ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }
                    : { background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff' }
                }
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Dodano do listy!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Dodaj do listy zakupów
                  </>
                )}
              </button>
            </div>

            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, i) => (
                <li
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl cursor-pointer transition-all hover:bg-orange-50"
                  style={{ opacity: checkedIngredients.has(i) ? 0.5 : 1 }}
                >
                  {checkedIngredients.has(i) ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#22c55e' }} />
                  ) : (
                    <Circle className="w-4 h-4 shrink-0" style={{ color: '#fed7aa' }} />
                  )}
                  <span
                    className="text-sm"
                    style={{
                      color: '#1c0a00',
                      textDecoration: checkedIngredients.has(i) ? 'line-through' : 'none',
                    }}
                  >
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ color: '#1c0a00' }}>Przygotowanie</h2>
              <span className="text-xs py-0.5 px-2 rounded-full" style={{ background: '#fef3e2', color: '#c2410c' }}>
                {checkedSteps.size}/{recipe.steps.length} kroków
              </span>
            </div>
            {/* Progress */}
            <div className="w-full h-1.5 rounded-full mb-5" style={{ background: '#fed7aa' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${recipe.steps.length > 0 ? (checkedSteps.size / recipe.steps.length) * 100 : 0}%`,
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                }}
              />
            </div>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li
                  key={i}
                  onClick={() => toggleStep(i)}
                  className="flex items-start gap-4 py-3 px-4 rounded-xl cursor-pointer transition-all hover:bg-orange-50"
                  style={{
                    opacity: checkedSteps.has(i) ? 0.55 : 1,
                    background: checkedSteps.has(i) ? '#f0fdf4' : undefined,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs mt-0.5"
                    style={{
                      background: checkedSteps.has(i) ? '#22c55e' : 'linear-gradient(135deg, #f97316, #ea580c)',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {checkedSteps.has(i) ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className="text-sm flex-1"
                    style={{
                      color: '#1c0a00',
                      lineHeight: 1.6,
                      textDecoration: checkedSteps.has(i) ? 'line-through' : 'none',
                    }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            {checkedSteps.size === recipe.steps.length && recipe.steps.length > 0 && (
              <div className="mt-5 py-3 px-4 rounded-xl text-center" style={{ background: '#f0fdf4' }}>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>🎉 Gotowe! Smacznego!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

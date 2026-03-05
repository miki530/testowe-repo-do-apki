import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Search, ChefHat, Plus, SlidersHorizontal, X } from 'lucide-react';
import { useRecipes } from '../hooks/useRecipes';
import { useCategories } from '../hooks/useCategories';
import { RecipeCard } from '../components/RecipeCard';

export function Home() {
  const { recipes, toggleFavorite } = useRecipes();
  const { categories } = useCategories();
  const allCategories = ['Wszystkie', ...categories];

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az'>('newest');

  const filtered = useMemo(() => {
    let list = [...recipes];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'Wszystkie') {
      list = list.filter(r => r.category === selectedCategory);
    }

    if (sortBy === 'newest') list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sortBy === 'oldest') list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    else if (sortBy === 'az') list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [recipes, search, selectedCategory, sortBy]);

  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 style={{ color: '#1c0a00' }}>Twoje przepisy</h1>
          <span
            className="px-3 py-1 rounded-full text-sm mt-1"
            style={{ background: '#fef3e2', color: '#c2410c', fontWeight: 600 }}
          >
            {recipes.length} przepisów
          </span>
        </div>
        <p style={{ color: '#9e7b6b' }}>Przeglądaj, szukaj i gotuj!</p>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#fdba74' }} />
          <input
            type="text"
            placeholder="Szukaj przepisu, składnika..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-orange-100 bg-white text-sm outline-none focus:ring-2"
            style={{ color: '#1c0a00' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4" style={{ color: '#9e7b6b' }} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 shrink-0" style={{ color: '#fdba74' }} />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="py-2.5 px-3 rounded-xl border border-orange-100 bg-white text-sm outline-none focus:ring-2"
            style={{ color: '#7c3d12' }}
          >
            <option value="newest">Najnowsze</option>
            <option value="oldest">Najstarsze</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm transition-all duration-150"
            style={{
              background: selectedCategory === cat ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#fff',
              color: selectedCategory === cat ? '#fff' : '#7c3d12',
              border: selectedCategory === cat ? 'none' : '1px solid #fed7aa',
              fontWeight: selectedCategory === cat ? 600 : 400,
              boxShadow: selectedCategory === cat ? '0 2px 8px rgba(249,115,22,0.3)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: '#fef3e2' }}>
            <ChefHat className="w-10 h-10" style={{ color: '#fdba74' }} />
          </div>
          {search || selectedCategory !== 'Wszystkie' ? (
            <>
              <h2 style={{ color: '#1c0a00', marginBottom: '0.5rem' }}>Brak wyników</h2>
              <p className="mb-5" style={{ color: '#9e7b6b' }}>
                Nie znaleziono przepisów pasujących do wyszukiwania.
              </p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('Wszystkie'); }}
                className="px-5 py-2 rounded-xl text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
              >
                Wyczyść filtry
              </button>
            </>
          ) : (
            <>
              <h2 style={{ color: '#1c0a00', marginBottom: '0.5rem' }}>Brak przepisów</h2>
              <p className="mb-5" style={{ color: '#9e7b6b' }}>
                Dodaj swój pierwszy przepis!
              </p>
              <Link
                to="/dodaj"
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
              >
                <Plus className="w-4 h-4" />
                Dodaj przepis
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
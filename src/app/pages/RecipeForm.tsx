import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Plus, Trash2, ArrowLeft, ChefHat,
  Clock, Users, Tag, AlignLeft, List
} from 'lucide-react';
import { useRecipes } from '../hooks/useRecipes';
import { useCategories } from '../hooks/useCategories';
import { Difficulty, Recipe } from '../types/recipe';
import { ImageInput } from '../components/ImageInput';

const DIFFICULTIES: Difficulty[] = ['łatwy', 'średni', 'trudny'];

type FormData = Omit<Recipe, 'id' | 'createdAt'>;

const defaultForm: FormData = {
  title: '',
  description: '',
  category: 'Obiad',
  prepTime: 15,
  cookTime: 30,
  servings: 4,
  difficulty: 'średni',
  ingredients: [''],
  steps: [''],
  image: '',
  tags: [],
  isFavorite: false,
};

export function RecipeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addRecipe, updateRecipe, getRecipe } = useRecipes();
  const { categories } = useCategories();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<FormData>(defaultForm);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id) {
      const recipe = getRecipe(id);
      if (recipe) {
        const { id: _id, createdAt: _c, ...rest } = recipe;
        setForm(rest);
      }
    }
  }, [id]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Tytuł jest wymagany';
    if (!form.description.trim()) errs.description = 'Opis jest wymagany';
    if (form.ingredients.filter(i => i.trim()).length === 0) errs.ingredients = 'Dodaj co najmniej jeden składnik';
    if (form.steps.filter(s => s.trim()).length === 0) errs.steps = 'Dodaj co najmniej jeden krok';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const cleanedForm = {
      ...form,
      ingredients: form.ingredients.filter(i => i.trim()),
      steps: form.steps.filter(s => s.trim()),
    };
    if (isEditing && id) {
      updateRecipe(id, cleanedForm);
      navigate(`/przepis/${id}`);
    } else {
      const newId = addRecipe(cleanedForm);
      navigate(`/przepis/${newId}`);
    }
  };

  // Ingredients
  const updateIngredient = (i: number, val: string) => {
    const arr = [...form.ingredients]; arr[i] = val; set('ingredients', arr);
  };
  const addIngredient = () => set('ingredients', [...form.ingredients, '']);
  const removeIngredient = (i: number) => {
    if (form.ingredients.length <= 1) return;
    set('ingredients', form.ingredients.filter((_, idx) => idx !== i));
  };

  // Steps
  const updateStep = (i: number, val: string) => {
    const arr = [...form.steps]; arr[i] = val; set('steps', arr);
  };
  const addStep = () => set('steps', [...form.steps, '']);
  const removeStep = (i: number) => {
    if (form.steps.length <= 1) return;
    set('steps', form.steps.filter((_, idx) => idx !== i));
  };

  // Tags
  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) set('tags', [...form.tags, tag]);
    setTagInput('');
  };
  const removeTag = (tag: string) => set('tags', form.tags.filter(t => t !== tag));

  const inputClass = (field?: string) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-orange-200 bg-white ${
      field && errors[field] ? 'border-red-300' : 'border-orange-100'
    }`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 mb-6 text-sm hover:opacity-70 transition-opacity"
        style={{ color: '#9e7b6b' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Powrót
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
          <ChefHat className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 style={{ color: '#1c0a00' }}>{isEditing ? 'Edytuj przepis' : 'Nowy przepis'}</h1>
          <p className="text-sm" style={{ color: '#9e7b6b' }}>
            {isEditing ? 'Zmień dane przepisu' : 'Wypełnij formularz, aby dodać przepis'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <section className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm space-y-4">
          <h2 style={{ color: '#1c0a00' }}>Podstawowe informacje</h2>

          {/* Title */}
          <div>
            <label className="block mb-1.5 text-sm" style={{ color: '#7c3d12' }}>Nazwa przepisu *</label>
            <input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="np. Spaghetti Bolognese"
              className={inputClass('title')}
              style={{ color: '#1c0a00' }}
            />
            {errors.title && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1.5 text-sm" style={{ color: '#7c3d12' }}>
              <AlignLeft className="inline w-3.5 h-3.5 mr-1" />
              Krótki opis *
            </label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Opisz swój przepis w kilku zdaniach..."
              rows={3}
              className={inputClass('description') + ' resize-none'}
              style={{ color: '#1c0a00' }}
            />
            {errors.description && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm" style={{ color: '#7c3d12' }}>Kategoria</label>
              <button
                type="button"
                onClick={() => navigate('/kategorie')}
                className="text-xs flex items-center gap-1 hover:underline"
                style={{ color: '#ea580c' }}
              >
                <Tag className="w-3 h-3" />
                Zarządzaj kategoriami
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => set('category', cat)}
                  className="px-3 py-1.5 rounded-xl text-sm transition-all"
                  style={{
                    background: form.category === cat ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#fef3e2',
                    color: form.category === cat ? '#fff' : '#c2410c',
                    fontWeight: form.category === cat ? 600 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1.5 text-sm" style={{ color: '#7c3d12' }}>Zdjęcie</label>
            <ImageInput
              value={form.image}
              onChange={val => set('image', val)}
            />
          </div>
        </section>

        {/* Time & Servings */}
        <section className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm">
          <h2 className="mb-4" style={{ color: '#1c0a00' }}>Czas i porcje</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1.5 text-sm" style={{ color: '#7c3d12' }}>
                <Clock className="inline w-3.5 h-3.5 mr-1" />
                Przygotowanie (min)
              </label>
              <input
                type="number" min={0} value={form.prepTime}
                onChange={e => set('prepTime', +e.target.value)}
                className={inputClass()} style={{ color: '#1c0a00' }}
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm" style={{ color: '#7c3d12' }}>
                <Clock className="inline w-3.5 h-3.5 mr-1" />
                Gotowanie (min)
              </label>
              <input
                type="number" min={0} value={form.cookTime}
                onChange={e => set('cookTime', +e.target.value)}
                className={inputClass()} style={{ color: '#1c0a00' }}
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm" style={{ color: '#7c3d12' }}>
                <Users className="inline w-3.5 h-3.5 mr-1" />
                Porcje
              </label>
              <input
                type="number" min={1} value={form.servings}
                onChange={e => set('servings', +e.target.value)}
                className={inputClass()} style={{ color: '#1c0a00' }}
              />
            </div>
          </div>

          {/* Difficulty */}
          <div className="mt-4">
            <label className="block mb-1.5 text-sm" style={{ color: '#7c3d12' }}>Poziom trudności</label>
            <div className="flex gap-2">
              {DIFFICULTIES.map(d => (
                <button
                  type="button" key={d}
                  onClick={() => set('difficulty', d)}
                  className="flex-1 py-2 rounded-xl text-sm capitalize transition-all"
                  style={{
                    background: form.difficulty === d
                      ? d === 'łatwy' ? '#f0fdf4' : d === 'średni' ? '#fffbeb' : '#fef2f2'
                      : '#fef3e2',
                    color: form.difficulty === d
                      ? d === 'łatwy' ? '#16a34a' : d === 'średni' ? '#d97706' : '#dc2626'
                      : '#9e7b6b',
                    border: form.difficulty === d
                      ? `2px solid ${d === 'łatwy' ? '#86efac' : d === 'średni' ? '#fcd34d' : '#fca5a5'}`
                      : '2px solid transparent',
                    fontWeight: form.difficulty === d ? 600 : 400,
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: '#1c0a00' }}>
              <List className="inline w-4 h-4 mr-2" style={{ color: '#f97316' }} />
              Składniki
            </h2>
            <span className="text-xs" style={{ color: '#9e7b6b' }}>{form.ingredients.filter(i => i.trim()).length} pozycji</span>
          </div>
          {errors.ingredients && <p className="text-xs mb-2" style={{ color: '#dc2626' }}>{errors.ingredients}</p>}
          <div className="space-y-2">
            {form.ingredients.map((ing, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs" style={{ background: '#fef3e2', color: '#f97316', fontWeight: 700 }}>
                  {i + 1}
                </div>
                <input
                  value={ing}
                  onChange={e => updateIngredient(i, e.target.value)}
                  placeholder={`Składnik ${i + 1}...`}
                  className="flex-1 px-3 py-2 rounded-xl border border-orange-100 text-sm outline-none focus:ring-2 focus:ring-orange-200 bg-white"
                  style={{ color: '#1c0a00' }}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addIngredient(); } }}
                />
                <button type="button" onClick={() => removeIngredient(i)} disabled={form.ingredients.length <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-red-50 disabled:opacity-30">
                  <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addIngredient}
            className="mt-3 flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl transition-all"
            style={{ background: '#fef3e2', color: '#c2410c' }}>
            <Plus className="w-4 h-4" />
            Dodaj składnik
          </button>
        </section>

        {/* Steps */}
        <section className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: '#1c0a00' }}>
              <List className="inline w-4 h-4 mr-2" style={{ color: '#f97316' }} />
              Kroki przygotowania
            </h2>
            <span className="text-xs" style={{ color: '#9e7b6b' }}>{form.steps.filter(s => s.trim()).length} kroków</span>
          </div>
          {errors.steps && <p className="text-xs mb-2" style={{ color: '#dc2626' }}>{errors.steps}</p>}
          <div className="space-y-2">
            {form.steps.map((step, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs mt-2" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', fontWeight: 700 }}>
                  {i + 1}
                </div>
                <textarea
                  value={step}
                  onChange={e => updateStep(i, e.target.value)}
                  placeholder={`Krok ${i + 1}...`}
                  rows={2}
                  className="flex-1 px-3 py-2 rounded-xl border border-orange-100 text-sm outline-none focus:ring-2 focus:ring-orange-200 bg-white resize-none"
                  style={{ color: '#1c0a00' }}
                />
                <button type="button" onClick={() => removeStep(i)} disabled={form.steps.length <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-red-50 disabled:opacity-30 mt-1">
                  <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addStep}
            className="mt-3 flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl transition-all"
            style={{ background: '#fef3e2', color: '#c2410c' }}>
            <Plus className="w-4 h-4" />
            Dodaj krok
          </button>
        </section>

        {/* Tags */}
        <section className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm">
          <h2 className="mb-4" style={{ color: '#1c0a00' }}>
            <Tag className="inline w-4 h-4 mr-2" style={{ color: '#f97316' }} />
            Tagi
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="np. włoskie, szybkie..."
              className="flex-1 px-3 py-2 rounded-xl border border-orange-100 text-sm outline-none focus:ring-2 focus:ring-orange-200 bg-white"
              style={{ color: '#1c0a00' }}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
            />
            <button type="button" onClick={addTag}
              className="px-4 py-2 rounded-xl text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
              Dodaj
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs" style={{ background: '#fef3e2', color: '#c2410c' }}>
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:opacity-70">×</button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Submit */}
        <div className="flex gap-3 pb-8">
          <button type="button" onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl border text-sm transition-all"
            style={{ borderColor: '#fed7aa', color: '#9e7b6b', background: '#fff' }}>
            Anuluj
          </button>
          <button type="submit"
            className="flex-1 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90 active:scale-95 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
            {isEditing ? 'Zapisz zmiany' : 'Dodaj przepis'}
          </button>
        </div>
      </form>
    </div>
  );
}

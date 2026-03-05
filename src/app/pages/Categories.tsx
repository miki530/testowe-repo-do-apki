import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Tag, Plus, Edit2, Trash2, Check, X, ArrowLeft, GripVertical, Info
} from 'lucide-react';
import { useCategories, getCategoryEmoji } from '../hooks/useCategories';
import { useRecipes } from '../hooks/useRecipes';

export function Categories() {
  const navigate = useNavigate();
  const { categories, addCategory, editCategory, deleteCategory } = useCategories();
  const { recipes } = useRecipes();

  const [newName, setNewName] = useState('');
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [addError, setAddError] = useState('');
  const [editError, setEditError] = useState('');

  const recipeCountByCategory = (cat: string) =>
    recipes.filter(r => r.category === cat).length;

  const handleAdd = () => {
    if (!newName.trim()) { setAddError('Podaj nazwę kategorii'); return; }
    const ok = addCategory(newName);
    if (!ok) { setAddError('Taka kategoria już istnieje'); return; }
    setNewName('');
    setAddError('');
  };

  const startEdit = (cat: string) => {
    setEditingName(cat);
    setEditValue(cat);
    setEditError('');
    setDeleteConfirm(null);
  };

  const confirmEdit = () => {
    if (!editingName) return;
    if (!editValue.trim()) { setEditError('Nazwa nie może być pusta'); return; }
    const ok = editCategory(editingName, editValue);
    if (!ok) { setEditError('Taka kategoria już istnieje'); return; }
    setEditingName(null);
    setEditError('');
  };

  const handleDelete = (cat: string) => {
    if (deleteConfirm === cat) {
      deleteCategory(cat);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(cat);
      setEditingName(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
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
          <Tag className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 style={{ color: '#1c0a00' }}>Kategorie</h1>
          <p className="text-sm" style={{ color: '#9e7b6b' }}>{categories.length} kategorii</p>
        </div>
      </div>

      {/* Add new */}
      <div className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm mb-5">
        <h2 className="mb-4" style={{ color: '#1c0a00' }}>Dodaj nową kategorię</h2>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={e => { setNewName(e.target.value); setAddError(''); }}
            placeholder="Nazwa kategorii..."
            className="flex-1 px-3 py-2.5 rounded-xl border border-orange-100 text-sm outline-none focus:ring-2 focus:ring-orange-200 bg-white"
            style={{ color: '#1c0a00' }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm shrink-0"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            <Plus className="w-4 h-4" />
            Dodaj
          </button>
        </div>
        {addError && <p className="text-xs mt-2" style={{ color: '#dc2626' }}>{addError}</p>}
      </div>

      {/* Category list */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-orange-50 flex items-center gap-2" style={{ background: '#fef9f5' }}>
          <Info className="w-4 h-4" style={{ color: '#fdba74' }} />
          <span className="text-xs" style={{ color: '#9e7b6b' }}>
            Kategorie używane w przepisach nie mogą być całkowicie usunięte bez ich edycji.
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-2">
            <Tag className="w-8 h-8" style={{ color: '#fdba74' }} />
            <p className="text-sm" style={{ color: '#9e7b6b' }}>Brak kategorii</p>
          </div>
        ) : (
          <ul>
            {categories.map((cat, idx) => {
              const count = recipeCountByCategory(cat);
              const isEditing = editingName === cat;
              const isDeleting = deleteConfirm === cat;

              return (
                <li
                  key={cat}
                  className="flex items-center gap-3 px-4 py-3 border-b border-orange-50 last:border-0 transition-all"
                  style={{ background: isDeleting ? '#fef2f2' : isEditing ? '#fff8f0' : '#fff' }}
                >
                  <GripVertical className="w-4 h-4 shrink-0 cursor-grab" style={{ color: '#d6c4bb' }} />

                  <span className="text-lg shrink-0" title={cat}>
                    {getCategoryEmoji(cat)}
                  </span>

                  {isEditing ? (
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex gap-2">
                        <input
                          value={editValue}
                          onChange={e => { setEditValue(e.target.value); setEditError(''); }}
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-orange-200 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                          style={{ color: '#1c0a00' }}
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') confirmEdit();
                            if (e.key === 'Escape') setEditingName(null);
                          }}
                        />
                        <button
                          onClick={confirmEdit}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50"
                        >
                          <Check className="w-4 h-4" style={{ color: '#16a34a' }} />
                        </button>
                        <button
                          onClick={() => setEditingName(null)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" style={{ color: '#9e7b6b' }} />
                        </button>
                      </div>
                      {editError && <p className="text-xs" style={{ color: '#dc2626' }}>{editError}</p>}
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm" style={{ color: '#1c0a00' }}>{cat}</span>
                        <span className="ml-2 text-xs" style={{ color: '#9e7b6b' }}>
                          {count > 0 ? `${count} przepis${count === 1 ? '' : count < 5 ? 'y' : 'ów'}` : 'brak przepisów'}
                        </span>
                      </div>

                      {isDeleting ? (
                        <div className="flex items-center gap-1 text-xs shrink-0">
                          <span style={{ color: '#dc2626' }}>Usunąć?</span>
                          <button
                            onClick={() => handleDelete(cat)}
                            className="px-2 py-1 rounded-lg text-xs text-white"
                            style={{ background: '#dc2626' }}
                          >
                            Tak
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 rounded-lg text-xs"
                            style={{ background: '#f3f4f6', color: '#6b7280' }}
                          >
                            Nie
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => startEdit(cat)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-orange-50 transition-all"
                            title="Edytuj"
                          >
                            <Edit2 className="w-3.5 h-3.5" style={{ color: '#f97316' }} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-all"
                            disabled={count > 0}
                            title={count > 0 ? 'Najpierw zmień kategorię w przepisach' : 'Usuń'}
                          >
                            <Trash2 className="w-3.5 h-3.5" style={{ color: count > 0 ? '#d6c4bb' : '#ef4444' }} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

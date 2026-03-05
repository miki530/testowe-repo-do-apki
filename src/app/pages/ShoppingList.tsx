import { useState } from 'react';
import { Link } from 'react-router';
import {
  ShoppingCart, Check, Trash2, Plus, X, CheckCheck,
  ChefHat, Eraser, PackageOpen
} from 'lucide-react';
import { useShoppingList } from '../hooks/useShoppingList';

export function ShoppingList() {
  const {
    items, totalCount, checkedCount,
    addSingleItem, toggleItem, removeItem,
    clearChecked, clearAll, updateItem
  } = useShoppingList();

  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    addSingleItem(newItem.trim());
    setNewItem('');
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const confirmEdit = () => {
    if (editingId && editValue.trim()) {
      updateItem(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  // Group by recipe
  const groupedItems: { label: string; recipeId?: string; items: typeof items }[] = [];
  const seen = new Set<string>();

  items.forEach(item => {
    const key = item.fromRecipe?.id ?? '__manual__';
    if (!seen.has(key)) {
      seen.add(key);
      groupedItems.push({
        label: item.fromRecipe?.name ?? 'Dodane ręcznie',
        recipeId: item.fromRecipe?.id,
        items: [],
      });
    }
    groupedItems.find(g => (g.recipeId ?? '__manual__') === key)!.items.push(item);
  });

  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 style={{ color: '#1c0a00' }}>Lista zakupów</h1>
            <p className="text-sm" style={{ color: '#9e7b6b' }}>
              {checkedCount}/{totalCount} produktów kupiono
            </p>
          </div>
        </div>
        {totalCount > 0 && (
          <div className="flex gap-2 shrink-0">
            {checkedCount > 0 && (
              <button
                onClick={clearChecked}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all hover:bg-orange-50"
                style={{ borderColor: '#fed7aa', color: '#9e7b6b' }}
                title="Usuń zaznaczone"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Usuń kupione</span>
              </button>
            )}
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all hover:bg-red-50"
              style={{ borderColor: '#fca5a5', color: '#ef4444' }}
              title="Wyczyść listę"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Wyczyść</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="mb-6">
          <div className="w-full h-2 rounded-full mb-1.5" style={{ background: '#fed7aa' }}>
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: progress === 100 ? '#22c55e' : 'linear-gradient(135deg, #f97316, #ea580c)' }}
            />
          </div>
          {progress === 100 && (
            <div className="flex items-center gap-1.5 justify-center py-2 rounded-xl" style={{ background: '#f0fdf4' }}>
              <CheckCheck className="w-4 h-4" style={{ color: '#22c55e' }} />
              <span className="text-sm" style={{ color: '#16a34a', fontWeight: 600 }}>Wszystko kupione! 🎉</span>
            </div>
          )}
        </div>
      )}

      {/* Add item */}
      <div className="bg-white rounded-2xl p-4 border border-orange-50 shadow-sm mb-5">
        <div className="flex gap-2">
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Dodaj produkt ręcznie..."
            className="flex-1 px-3 py-2.5 rounded-xl border border-orange-100 text-sm outline-none focus:ring-2 focus:ring-orange-200 bg-white"
            style={{ color: '#1c0a00' }}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
          />
          <button
            onClick={handleAdd}
            disabled={!newItem.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm shrink-0 transition-all disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            <Plus className="w-4 h-4" />
            Dodaj
          </button>
        </div>
      </div>

      {/* Empty state */}
      {totalCount === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: '#fef3e2' }}>
            <PackageOpen className="w-10 h-10" style={{ color: '#fdba74' }} />
          </div>
          <h2 style={{ color: '#1c0a00', marginBottom: '0.5rem' }}>Lista jest pusta</h2>
          <p className="mb-5 max-w-xs" style={{ color: '#9e7b6b' }}>
            Dodaj produkty ręcznie lub przejdź do przepisu i kliknij „Dodaj do listy zakupów".
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            <ChefHat className="w-4 h-4" />
            Przeglądaj przepisy
          </Link>
        </div>
      )}

      {/* Grouped list */}
      {groupedItems.map(group => (
        <div key={group.recipeId ?? '__manual__'} className="mb-5">
          <div className="flex items-center gap-2 mb-2 px-1">
            {group.recipeId ? (
              <Link
                to={`/przepis/${group.recipeId}`}
                className="text-xs hover:underline flex items-center gap-1"
                style={{ color: '#ea580c', fontWeight: 600 }}
              >
                <ChefHat className="w-3.5 h-3.5" />
                {group.label}
              </Link>
            ) : (
              <span className="text-xs flex items-center gap-1" style={{ color: '#9e7b6b', fontWeight: 600 }}>
                <Plus className="w-3.5 h-3.5" />
                {group.label}
              </span>
            )}
            <span className="text-xs" style={{ color: '#c4a99a' }}>
              ({group.items.filter(i => i.checked).length}/{group.items.length})
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden">
            {group.items.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-orange-50 last:border-0 transition-all"
                style={{ background: item.checked ? '#f9fafb' : '#fff' }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                  style={{
                    borderColor: item.checked ? '#22c55e' : '#fed7aa',
                    background: item.checked ? '#22c55e' : '#fff',
                  }}
                >
                  {item.checked && <Check className="w-3.5 h-3.5 text-white" />}
                </button>

                {/* Name */}
                {editingId === item.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="flex-1 px-2 py-1 rounded-lg border border-orange-200 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                      style={{ color: '#1c0a00' }}
                      autoFocus
                      onKeyDown={e => {
                        if (e.key === 'Enter') confirmEdit();
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                    />
                    <button onClick={confirmEdit}>
                      <Check className="w-4 h-4" style={{ color: '#22c55e' }} />
                    </button>
                    <button onClick={() => setEditingId(null)}>
                      <X className="w-4 h-4" style={{ color: '#9e7b6b' }} />
                    </button>
                  </div>
                ) : (
                  <span
                    className="flex-1 text-sm cursor-pointer hover:text-orange-600 transition-colors"
                    style={{
                      color: item.checked ? '#9e7b6b' : '#1c0a00',
                      textDecoration: item.checked ? 'line-through' : 'none',
                    }}
                    onDoubleClick={() => startEdit(item.id, item.name)}
                    title="Kliknij dwukrotnie, aby edytować"
                  >
                    {item.name}
                  </span>
                )}

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: '#fca5a5' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

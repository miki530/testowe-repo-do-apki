import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'przepisnik_shopping_list';

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  fromRecipe?: { id: string; name: string };
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* ignore */ }
  }, [items]);

  const addItems = useCallback((
    names: string[],
    fromRecipe?: { id: string; name: string }
  ) => {
    const newItems: ShoppingItem[] = names
      .filter(n => n.trim())
      .map(name => ({
        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        name: name.trim(),
        checked: false,
        fromRecipe,
      }));
    setItems(prev => [...prev, ...newItems]);
    return newItems.length;
  }, []);

  const addSingleItem = useCallback((name: string) => {
    if (!name.trim()) return;
    setItems(prev => [
      ...prev,
      {
        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        name: name.trim(),
        checked: false,
      },
    ]);
  }, []);

  const toggleItem = useCallback((id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearChecked = useCallback(() => {
    setItems(prev => prev.filter(item => !item.checked));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const updateItem = useCallback((id: string, name: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, name } : item
    ));
  }, []);

  const checkedCount = items.filter(i => i.checked).length;
  const totalCount = items.length;

  return {
    items, totalCount, checkedCount,
    addItems, addSingleItem, toggleItem, removeItem,
    clearChecked, clearAll, updateItem,
  };
}

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'przepisnik_categories';

export const DEFAULT_CATEGORIES = [
  'Śniadanie', 'Obiad', 'Kolacja', 'Zupa', 'Sałatka', 'Deser', 'Przekąska', 'Inne'
];

export const CATEGORY_EMOJI: Record<string, string> = {
  Śniadanie: '🌅',
  Obiad: '🍽️',
  Kolacja: '🌙',
  Deser: '🍰',
  Przekąska: '🥨',
  Zupa: '🍲',
  Sałatka: '🥗',
  Inne: '🍴',
};

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? '🍴';
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch { /* ignore */ }
  }, [categories]);

  const addCategory = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) return false;
    setCategories(prev => [...prev, trimmed]);
    return true;
  }, [categories]);

  const editCategory = useCallback((oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return false;
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase() && c !== oldName)) return false;
    setCategories(prev => prev.map(c => c === oldName ? trimmed : c));
    return true;
  }, [categories]);

  const deleteCategory = useCallback((name: string) => {
    setCategories(prev => prev.filter(c => c !== name));
  }, []);

  const reorder = useCallback((from: number, to: number) => {
    setCategories(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  }, []);

  return { categories, addCategory, editCategory, deleteCategory, reorder };
}

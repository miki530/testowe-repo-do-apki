import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '../types/recipe';

const STORAGE_KEY = 'przepisnik_recipes';

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Bolognese',
    description: 'Klasyczne włoskie spaghetti z mięsnym sosem bolońskim. Aromatyczne, sycące danie idealne na rodzinny obiad.',
    category: 'Obiad',
    prepTime: 15,
    cookTime: 45,
    servings: 4,
    difficulty: 'średni',
    image: 'https://images.unsplash.com/photo-1604367285668-73d5dea642de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ingredients: [
      '400g spaghetti',
      '500g mielonego mięsa wołowego',
      '1 cebula',
      '2 ząbki czosnku',
      '400g passaty pomidorowej',
      '2 łyżki oliwy z oliwek',
      'sól, pieprz do smaku',
      'bazylia świeża',
      '50g parmezanu',
    ],
    steps: [
      'Ugotuj spaghetti al dente zgodnie z instrukcją na opakowaniu.',
      'Na rozgrzanej oliwie podsmaż posiekaną cebulę i czosnek przez 3-4 minuty.',
      'Dodaj mięso mielone i smaż do zrumienienia, rozbijając grudki.',
      'Wlej passatę, dopraw solą i pieprzem. Gotuj na wolnym ogniu 30 minut.',
      'Podaj sos na spaghetti, posyp parmezanem i świeżą bazylią.',
    ],
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['włoskie', 'pasta', 'mięso'],
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Zupa pomidorowa',
    description: 'Tradycyjna polska zupa pomidorowa z ryżem. Kremowa, rozgrzewająca i pełna smaku.',
    category: 'Zupa',
    prepTime: 10,
    cookTime: 30,
    servings: 6,
    difficulty: 'łatwy',
    image: 'https://images.unsplash.com/photo-1620416328738-dae3168e6890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ingredients: [
      '1,5l bulionu drobiowego',
      '400g passaty pomidorowej',
      '3 łyżki koncentratu pomidorowego',
      '200ml śmietany 18%',
      '100g ryżu',
      'sól, cukier do smaku',
      'bazylia, oregano',
      '1 marchewka',
      '1 pietruszka',
    ],
    steps: [
      'W garnku podgrzej bulion z marchewką i pietruszką.',
      'Dodaj passatę i koncentrat pomidorowy, wymieszaj.',
      'Wsyp ryż i gotuj 20 minut na wolnym ogniu.',
      'Wlej śmietanę, dopraw solą i cukrem do smaku.',
      'Podgrzewaj jeszcze 5 minut, podaj z pieczywem.',
    ],
    createdAt: '2024-01-20T14:00:00Z',
    tags: ['polska', 'zupa', 'wegetariańska'],
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Ciasto czekoladowe',
    description: 'Wilgotne i intensywnie czekoladowe ciasto. Idealne na każdą okazję – proste w przygotowaniu, a niesamowite w smaku.',
    category: 'Deser',
    prepTime: 20,
    cookTime: 40,
    servings: 8,
    difficulty: 'średni',
    image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ingredients: [
      '200g ciemnej czekolady',
      '150g masła',
      '150g cukru',
      '3 jajka',
      '100g mąki',
      '2 łyżki kakao',
      '1 łyżeczka proszku do pieczenia',
      'szczypta soli',
      '100ml śmietany do dekoracji',
    ],
    steps: [
      'Roztop czekoladę z masłem w kąpieli wodnej lub mikrofalówce.',
      'Ubij jajka z cukrem na puszystą masę.',
      'Połącz czekoladę z jajkami, dodaj przesianą mąkę, kakao i proszek.',
      'Przelej do formy wyłożonej papierem, piecz w 180°C przez 35-40 minut.',
      'Ostudź, udekoruj bitą śmietaną i kawałkami czekolady.',
    ],
    createdAt: '2024-02-01T16:00:00Z',
    tags: ['czekolada', 'ciasto', 'deser'],
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Sałatka z grillowanym kurczakiem',
    description: 'Lekka i sycąca sałatka z soczyście grillowanym kurczakiem, świeżymi warzywami i dressingiem cytrynowym.',
    category: 'Sałatka',
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    difficulty: 'łatwy',
    image: 'https://images.unsplash.com/photo-1760888549075-0b9727e07735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ingredients: [
      '2 piersi z kurczaka',
      '150g mieszanki sałat',
      '1 awokado',
      '200g pomidorków koktajlowych',
      '1 ogórek',
      '3 łyżki oliwy z oliwek',
      'sok z 1 cytryny',
      'sól, pieprz, czosnek granulowany',
      '50g parmezanu w wiórach',
    ],
    steps: [
      'Kurczaka marynuj w oliwie, soku z cytryny i przyprawach przez 15 minut.',
      'Grilluj na rozgrzanej patelni grillowej po 6-7 minut z każdej strony.',
      'Pokrój kurczaka w plastry, awokado w kostkę, ogórek w półplasterki.',
      'Wymieszaj dressing z oliwy, soku z cytryny, soli i pieprzu.',
      'Ułóż sałatę, warzywa, kurczaka, polej dressingiem i posyp parmezanem.',
    ],
    createdAt: '2024-02-10T12:00:00Z',
    tags: ['zdrowe', 'kurczak', 'fit'],
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Naleśniki z dżemem',
    description: 'Puchate i cienkie naleśniki – klasyczne śniadanie lub deser. Podawane z dżemem, śmietaną lub owocami.',
    category: 'Śniadanie',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'łatwy',
    image: 'https://images.unsplash.com/photo-1739897091734-0f4af03cace2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ingredients: [
      '2 jajka',
      '500ml mleka',
      '200g mąki pszennej',
      '1 łyżka cukru',
      'szczypta soli',
      '2 łyżki masła (do smażenia)',
      'dżem truskawkowy do podania',
      'cukier puder do posypania',
    ],
    steps: [
      'Zmiksuj jajka z mlekiem, dodaj przesianą mąkę, cukier i sól.',
      'Miksuj do uzyskania gładkiego, rzadkiego ciasta bez grudek.',
      'Odstaw ciasto na 15-20 minut.',
      'Na rozgrzanej, lekko natłuszczonej patelni smaż cienkie naleśniki po ok. 1 minucie z każdej strony.',
      'Podawaj z dżemem, owinięte lub złożone w trójkąt, posypane cukrem pudrem.',
    ],
    createdAt: '2024-02-15T08:00:00Z',
    tags: ['śniadanie', 'szybkie', 'słodkie'],
    isFavorite: false,
  },
];

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return SAMPLE_RECIPES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch {
      // ignore
    }
  }, [recipes]);

  const addRecipe = useCallback((recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setRecipes(prev => [newRecipe, ...prev]);
    return newRecipe.id;
  }, []);

  const updateRecipe = useCallback((id: string, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  }, []);

  const getRecipe = useCallback((id: string) => {
    return recipes.find(r => r.id === id);
  }, [recipes]);

  return { recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite, getRecipe };
}

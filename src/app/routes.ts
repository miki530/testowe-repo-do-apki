import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { RecipeDetail } from './pages/RecipeDetail';
import { RecipeForm } from './pages/RecipeForm';
import { ShoppingList } from './pages/ShoppingList';
import { Categories } from './pages/Categories';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'ulubione', Component: Favorites },
      { path: 'przepis/:id', Component: RecipeDetail },
      { path: 'dodaj', Component: RecipeForm },
      { path: 'edytuj/:id', Component: RecipeForm },
      { path: 'lista-zakupow', Component: ShoppingList },
      { path: 'kategorie', Component: Categories },
    ],
  },
]);

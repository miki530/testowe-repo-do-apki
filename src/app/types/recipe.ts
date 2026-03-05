export type Difficulty = 'łatwy' | 'średni' | 'trudny';

export type Category = string;

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: Category;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  ingredients: string[];
  steps: string[];
  image: string;
  createdAt: string;
  tags: string[];
  isFavorite: boolean;
}

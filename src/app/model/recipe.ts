import { Ingredient } from './ingredient';

export interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  ingredients?: Ingredient[];
}

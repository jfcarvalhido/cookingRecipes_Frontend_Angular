import { Category } from "./category";
import { Ingredient } from "./ingredient";

export interface Recipe {
  id: number;
  title: string;
  categories: Category[];
  serving: number;
  difficulty: number;
  cookingTime: number;
  ingredients: Ingredient[];
  preparation: string
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient';
import { Recipe } from '../model/recipe';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeChanged = new Subject<Recipe>();
  listRecipe: Recipe[] = [];

  constructor(private ingredientService: IngredientService) {}

  addRecipe(recipe: Recipe) {
    this.listRecipe.push(recipe);
    this.recipesChanged.next([...this.listRecipe]);
  }
  getListRecipe(): Recipe[] {
    return [...this.listRecipe];
  }
  getRecipeById(id: number) {
    return this.listRecipe.find((recipe) => recipe.id === id);
  }
  deleteRecipe(id: number) {
    this.listRecipe = this.listRecipe.filter((recipe) => recipe.id !== id);
    this.recipesChanged.next([...this.listRecipe]);
  }

  updateRecipe(recipe: Recipe) {
    let recipeMatch = this.getRecipeById(recipe.id);
    let indexOf = this.listRecipe.indexOf(recipeMatch!);
    this.listRecipe[indexOf] = recipe;
    this.recipesChanged.next([...this.listRecipe]);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ingredientService.addIngredients(ingredients);
  }
}

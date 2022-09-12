import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [];

  constructor() {}

  getIngredients() {
    return [...this.ingredients];
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next([...this.ingredients]);
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next([...this.ingredients]);
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }
}

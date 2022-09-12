import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../model/ingredient';
import { IngredientService } from '../service/ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];
  subscription!: Subscription;

  constructor(private ingredientService: IngredientService) {}

  editItem(index: number) {
    this.ingredientService.startedEditing.next(index);
  }

  ngOnInit() {
    this.ingredients = this.ingredientService.getIngredients();
    this.subscription = this.ingredientService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
}

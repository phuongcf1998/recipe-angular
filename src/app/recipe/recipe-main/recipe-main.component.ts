import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.scss'],
})
export class RecipeMainComponent implements OnInit {
  listRecipe!: Recipe[];
  subscription!: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.listRecipe = this.recipeService.getListRecipe();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (listRecipe: Recipe[]) => {
        this.listRecipe = listRecipe;
      }
    );
  }
}

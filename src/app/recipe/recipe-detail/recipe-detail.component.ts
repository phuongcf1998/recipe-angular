import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  idRecipe!: number | undefined;
  recipeItem!: Recipe | undefined;
  imageHeight: string = '350px';
  imageWidth: string = '300px';
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  addToShoppingList() {
    if (this.recipeItem?.ingredients?.length! > 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ingredients of recipe have been added!!!',
        showConfirmButton: false,
        timer: 1500,
      });

      this.recipeService.addIngredientsToShoppingList(
        this.recipeItem?.ingredients!
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingredients are empty!',
      
      })
    }
  }
  deleteRecipe() {
    Swal.fire({
      title: 'Are you sure delete this item?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipeService.deleteRecipe(this.idRecipe!);
        this.router.navigateByUrl('/recipes');
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idRecipe = Number(params.get('id'));
      this.recipeItem = this.recipeService.getRecipeById(this.idRecipe);
    });
  }
}

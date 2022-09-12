import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredient';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  imageURL!: string;
  isValidUrlImage: boolean = false;
  imgWidth: string = '200px';
  editMode: boolean = false;
  recipeItem!: Recipe | undefined;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]),
    });
  }

  ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  newIngredient(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  addIngredient() {
    this.ingredients().push(this.newIngredient());
  }

  showPreview(event: Event) {
    this.imageURL = (event.target as HTMLInputElement).value;
  }

  removeIngredient(i: number) {
    this.ingredients().removeAt(i);
  }

  buildIngredientItemsForm(item: Ingredient): FormGroup {
    return this.fb.group({
      name: item.name,
      amount: item.amount,
    });
  }
  pushedIngredientItemsForm() {
    this.recipeItem?.ingredients!.forEach((ingredientItem) => {
      this.ingredients().push(this.buildIngredientItemsForm(ingredientItem));
    });
  }

  onSubmit() {
    if (this.editMode === false) {
      this.recipeService.addRecipe({
        id: Date.now(),
        ...this.recipeForm.value,
      });
      this.router.navigateByUrl('/recipes');
    } else {
      this.recipeService.updateRecipe({
        id: this.recipeItem?.id,
        ...this.recipeForm.value,
      });
      this.router.navigateByUrl('/recipes');
    }
  }
  get name() {
    return this.recipeForm.get('name');
  }
  get imageUrl() {
    return this.recipeForm.get('imageUrl');
  }
  get description() {
    return this.recipeForm.get('description');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      
      if (params.get('id') !== null) {
        this.recipeItem = this.recipeService.getRecipeById(
          Number(params.get('id'))
        );
        this.editMode = true;

        this.recipeForm = this.fb.group({
          name: [this.recipeItem?.name, Validators.required],
          imageUrl: [this.recipeItem?.imageUrl, Validators.required],
          description: [this.recipeItem?.description, Validators.required],
          ingredients: this.fb.array([]),
        });
        this.pushedIngredientItemsForm();

        this.imageURL = this.recipeItem?.imageUrl!;
      } else {
        this.recipeForm = this.fb.group({
          name: ['', Validators.required],
          imageUrl: ['', Validators.required],
          description: ['', Validators.required],
          ingredients: this.fb.array([]),
        });
      }
    });
  }
}

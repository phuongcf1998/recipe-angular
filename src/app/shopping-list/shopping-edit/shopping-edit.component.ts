import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/service/ingredient.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm!: FormGroup;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder
  ) {
    this.shoppingForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.ingredientService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.ingredientService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  clearDataForm() {
    this.shoppingForm.reset();
  }

  onDelete() {
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
        this.ingredientService.deleteIngredient(this.editedItemIndex);
        this.clearDataForm();
      }
    });
  }
  onSubmit() {
    const { name, amount } = this.shoppingForm.value;
    if (this.editMode) {
      this.ingredientService.updateIngredient(this.editedItemIndex, {
        name,
        amount,
      });
    } else {
      this.ingredientService.addIngredient({
        name,
        amount,
      });
    }
    this.editMode = false;
    this.clearDataForm();
  }
}

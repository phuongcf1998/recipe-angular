import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';
import { RecipeMainComponent } from './recipe/recipe-main/recipe-main.component';
import { RecipeNewComponent } from './recipe/recipe-new/recipe-new.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipeMainComponent,
    children: [
      {
        path: '',
        component: RecipeNewComponent,
      },
      {
        path: 'new',
        component: RecipeFormComponent,
      },
      {
        path: 'detail/:id',
        component: RecipeDetailComponent,
      },
      {
        path: 'edit/:id',
        component: RecipeFormComponent,
      },
    ],
  },
  { path: 'shopping', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

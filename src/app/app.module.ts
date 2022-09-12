import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeMainComponent } from './recipe/recipe-main/recipe-main.component';
import { RecipeNewComponent } from './recipe/recipe-new/recipe-new.component';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';
import { RecipeItemComponent } from './recipe/recipe-item/recipe-item.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeNewComponent,
    RecipeDetailComponent,
    RecipeMainComponent,
    RecipeFormComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ButtonModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-dropdown',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() listRecipe: Recipe[] = [];

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ingredient } from '../../interfaces/ingredient';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id! : number;
  recipe! : Recipe;
  ingredients : Ingredient[] = [];

  constructor(public recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.recipeService.search(this.id).subscribe((data: Recipe) => {
      this.recipe = data;
      console.log(this.recipe);
    });
  }


}

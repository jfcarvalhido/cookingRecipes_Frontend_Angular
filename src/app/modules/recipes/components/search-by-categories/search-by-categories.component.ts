import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-search-by-categories',
  templateUrl: './search-by-categories.component.html',
  styleUrls: ['./search-by-categories.component.css']
})
export class SearchByCategoriesComponent implements OnInit {
  recipes : Recipe[] = [];
  name!: string;

  constructor(public recipeService : RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];

    this.recipeService.searchByCategory(this.name).subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log(this.recipes);
    });
  }
}

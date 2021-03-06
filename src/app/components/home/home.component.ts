import { Component, OnInit } from '@angular/core';

import { RecipeService } from 'src/app/modules/recipes/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public recipeService : RecipeService) { }

  ngOnInit(): void {
  }

}

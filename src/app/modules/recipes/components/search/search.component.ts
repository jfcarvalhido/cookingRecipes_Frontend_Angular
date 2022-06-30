import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  recipes : Recipe[] = [];
  title! : string;
  form!: FormGroup;

  constructor(public recipeService : RecipeService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl()
    });
  }

  searchRecipe(){
    this.title = this.form.value.title
    this.recipeService.searchByName(this.title).subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log(this.recipes);
    });
  }
}

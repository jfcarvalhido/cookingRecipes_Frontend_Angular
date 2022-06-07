import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(public recipesService: RecipeService, private route: Router) { }

  ngOnInit(): void {
    this.recipesService.getAll().subscribe( (data: Recipe[]) => {
      this.recipes = data;
      console.log(this.recipes);
    });
  }

  deleteRecipes(id: number){
    this.recipesService.delete(id).subscribe(res => this.recipes = this.recipes.filter(item => item.id !== id));
    console.log("Apagado com sucesso")
  }

}

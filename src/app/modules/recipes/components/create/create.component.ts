import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';
import { Ingredient } from '../../interfaces/ingredient';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  recipeForm!: FormGroup;
  categoriesData : Category[] = [];

  constructor(private fb: FormBuilder, public recipeService : RecipeService, private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let title = '';
    let categories =
      this.recipeService.getAllCategories().subscribe( (data: Category[]) => {
      this.categoriesData = data;
      console.log(this.categoriesData);
    });
    let serving = null;
    let difficulty = null;
    let cookingTime = null;
    let ingredients = '';
    let preparation = '';

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      'categories': new FormArray([new FormControl(categories, [Validators.required])]),
      'serving': new FormControl(serving, [Validators.required]),
      'difficulty': new FormControl(difficulty, [Validators.required]),
      'cookingTime': new FormControl(cookingTime, [Validators.required]),
      'ingredients': new FormControl(ingredients, [Validators.required]),
      'preparation': new FormControl(preparation, [Validators.required, Validators.maxLength(3000)])
    });
  }

  onChange(e : any) {
    const categories : FormArray = this.recipeForm.get('categories') as FormArray;

    if (e.target.checked) {
      categories.push(new FormControl(e.target.value));
    } else {
      const index = categories.controls.findIndex(x => x.value === e.target.value);
      categories.removeAt(index);
    }
  }

  get f(){
    return this.recipeForm.controls;
  }

  onSubmit(){
    console.log(this.recipeForm.value);

    let rf = this.recipeForm.value;

    const recipe : Recipe = {
      id: 0,
      title: rf.title,
      categories: (rf.categories.slice(1) as string[]).map(i => {
        const newCategory : Category = { id: 0, name: i } as Category
        return newCategory
      }),
      serving: Number(rf.serving),
      difficulty : Number(rf.difficulty),
      cookingTime : Number(rf.cookingTime),
      ingredients: String(rf.ingredients)
      .split(',')
      .map(i => {
        const newIngredient : Ingredient = { id: 0, nameIngredient: i.trim() } as Ingredient
        return newIngredient
      }),
      preparation: rf.preparation
    };

    console.log(recipe);

    this.recipeService.create(recipe).subscribe((res: any) => {
      this.router.navigateByUrl("/recipes/index");
    });
  }
}

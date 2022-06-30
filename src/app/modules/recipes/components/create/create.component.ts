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
  allCategories : Category[] = [];

  constructor(private fb: FormBuilder, public recipeService : RecipeService, private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    let allCategories = this.recipeService.getAllCategories().subscribe( (data: Category[]) => {
      this.allCategories = data;
    });

    this.recipeForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      categories: new FormArray([new FormControl(allCategories, [Validators.required])]),
      serving: new FormControl(null, [Validators.required]),
      difficulty: new FormControl(null, [Validators.required]),
      cookingTime: new FormControl(null, [Validators.required]),
      ingredients : new FormArray([]),
      preparation: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(3000)])
    });
  }

  get f(){
    return this.recipeForm.controls;
  }

  addIngredient(nameIngredient : string){
    let ingredients = this.recipeForm.get('ingredients') as FormArray;

    ingredients.push(this.fb.group({
       nameIngredient : [nameIngredient, [Validators.required]]
       })
    );
  }

  trackByFn(index: any, nameIngredient: any) {
    return index;
 }

  deleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
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
      ingredients: rf.ingredients,
      preparation: rf.preparation
    };

    console.log(recipe);

    this.recipeService.create(recipe).subscribe((res: any) => {
      this.router.navigateByUrl("/recipes/index");
    });
  }
}

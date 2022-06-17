import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';
import { Category } from '../../interfaces/category';
import { Ingredient } from '../../interfaces/ingredient';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  recipe! : Recipe;
  recipeForm! : FormGroup;
  allCategories : Category[] = [];

  constructor(public fb : FormBuilder, public recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.recipeService.search(this.id).subscribe((data: Recipe) => {
      this.recipe = data;
      this.setIngredients();
    });

    let allCategories = this.recipeService.getAllCategories().subscribe( (data: Category[]) => {
      this.allCategories = data;
    });

    this.recipeForm = new FormGroup({
      id: new FormControl(this.id),
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      categories: new FormArray([new FormControl(allCategories, [Validators.required])]),
      serving: new FormControl(null, [Validators.required]),
      difficulty: new FormControl(null, [Validators.required]),
      cookingTime: new FormControl(null, [Validators.required]),
      ingredients : this.fb.array([]),
      preparation: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(3000)])
    });
  }

  setIngredients(){
    this.recipe.ingredients.forEach(element => {
      this.addIngredient(element.nameIngredient)
    });
  }

  /* addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'nameIngredient': new FormControl(null, Validators.required)

      })
    );
  } */

  get ingredients() {
    return this.recipeForm.controls['ingredients']
  }

  addIngredient(nameIngredient : string){
    let ingredients = this.recipeForm.get('ingredients') as FormArray;

    ingredients.push(this.fb.group({
       nameIngredient : [nameIngredient, [Validators.required]]
       })
    );
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

  get f(){
    return this.recipeForm.controls;
  }

  onSubmit(){
    console.log(this.recipeForm.value);

    let rf = this.recipeForm.value;

    const recipe : Recipe = {
      id: rf.id,
      title: rf.title,
      categories:
      (rf.categories.slice(1) as string[]).map(i => {
        const newCategory : Category = { name: i } as Category
        return newCategory
      }),
      serving: Number(rf.serving),
      difficulty : Number(rf.difficulty),
      cookingTime : Number(rf.cookingTime),
      ingredients: rf.ingredients,
      preparation: rf.preparation
    };

    console.log(JSON.stringify(recipe));

    this.recipeService.update(this.id, recipe).subscribe((res: any) => {
      this.router.navigateByUrl("/recipes/index")
    });
  }
}

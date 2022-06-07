import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(public recipeService : RecipeService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      categories: new FormArray([
        new FormGroup({
          name: new FormControl('', [Validators.required])
        })
      ]),
      serving: new FormControl('', [Validators.required]),
      difficulty: new FormControl('', [Validators.required]),
      cookingTime: new FormControl('', [Validators.required]),
      ingredients: new FormArray([
        new FormGroup({
          nameIngredient: new FormControl('', [Validators.required])
        })
      ]),
      preparation: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  get f(){
    return this.recipeForm.controls;
  }

  onSubmit(){
    console.log(this.recipeForm.value);

    this.recipeService.create(this.recipeForm.value).subscribe((res: any) => {
      this.router.navigateByUrl("/recipes/index");
    });
  }



}

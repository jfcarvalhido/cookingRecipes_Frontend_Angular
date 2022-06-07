import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ViewComponent } from './components/view/view.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { SearchByCategoriesComponent } from './components/search-by-categories/search-by-categories.component';


const routes: Routes = [
  { path:'recipes', redirectTo: 'recipes/index', pathMatch: 'full' },
  { path: 'recipes/index', component: IndexComponent },
  { path: 'recipes/create', component: CreateComponent },
  { path: 'recipes/view/:id', component: ViewComponent },
  { path: 'recipes/:recipesId/update', component: EditComponent },
  { path: 'recipes/search-by-categories/:name', component: SearchByCategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }

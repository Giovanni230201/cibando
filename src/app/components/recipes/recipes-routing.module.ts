import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/logged-in.guard';

import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { DetailComponent } from './detail/detail.component';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { ResultComponent } from './result/result.component';

const routes: Routes =[
  {path:'',component: RecipesComponent,children: [
    {path:'dettaglio/:title/:_id', component: DetailComponent},
    {path:'new-recipes', component: NewRecipeComponent, canActivate:[LoggedInGuard]},
    {path:'cerca/:text', component: ResultComponent},
    {path:'recipes',pathMatch:'full', component: RecipesListComponent },
  ]}
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipeRoutingModule{}

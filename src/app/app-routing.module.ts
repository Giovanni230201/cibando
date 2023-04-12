import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { EsempioCombineComponent } from './components/esempio-combine/esempio-combine.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'ricette',component: RecipesComponent, children:[
    {path:'dettaglio/:title/:_id', component: DetailComponent},
    {path:'', pathMatch: 'full', component:RecipesListComponent}
  ] },
  {path:'sign-in', component: SignInComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent,canActivate: [LoggedInGuard]},
  {path:'new-recipe', component: NewRecipeComponent},
  {path:'combine', component: EsempioCombineComponent},
  {path:'**',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

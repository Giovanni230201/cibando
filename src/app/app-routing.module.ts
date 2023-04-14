import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EsempioCombineComponent } from './components/esempio-combine/esempio-combine.component';
import { ResultComponent } from './components/recipes/result/result.component';
const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'combine', component: EsempioCombineComponent},
  {path: 'recipes', loadChildren: () => import("./components/recipes/recipes.module").then(modulo => modulo.RecipesModule)},
  {path: 'user', loadChildren: () => import("./components/user/user.module").then(modulo => modulo.UsersModule)},
  {path:'**',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EsempioCombineComponent } from './components/esempio-combine/esempio-combine.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'sign-in', component: SignInComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent,canActivate: [LoggedInGuard]},
  {path:'combine', component: EsempioCombineComponent},
  {path: 'recipes', loadChildren: () => import("./components/recipes/recipes.module").then(modulo => modulo.RecipesModule)},
  {path:'**',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

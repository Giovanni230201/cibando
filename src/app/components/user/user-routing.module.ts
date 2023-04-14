import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoggedInGuard } from 'src/app/logged-in.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component:UserComponent,children:[
    {path:'sign-in', component: SignInComponent},
    {path:'login', component: LoginComponent},
    {path:'profile', component: ProfileComponent,canActivate: [LoggedInGuard]},
  ]}
  ]



@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

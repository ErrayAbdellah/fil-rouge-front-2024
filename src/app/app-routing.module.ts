import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinginComponent } from './components/singin/singin.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './_guards/authGuard';
import { UsersComponent } from './components/dashboard/users/users.component';
import { adminGuard } from './_guards/admin.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full', canActivate: [authGuard]},
  { path: 'dashboard-users' , component: UsersComponent, canActivate: [adminGuard,adminGuard] },
  { path: 'profile' , component: ProfileComponent ,canActivate: [authGuard]},
  { path: 'login', component: SinginComponent  },
  { path: 'register', component: RegisterComponent },
  { path:"" , component : HomeComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

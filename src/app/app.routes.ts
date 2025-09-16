import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { HomeComponent } from './dashboard/home-component/home-component';

export const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
];

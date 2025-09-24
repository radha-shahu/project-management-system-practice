import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path: 'Login',
    loadComponent: () =>
      import('./auth/login-component/login-component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'Home',
    loadComponent: () =>
      import('./dashboard/home-component/home-component').then(
        (m) => m.HomeComponent
      ),
    // canActivate: [authGuard]
  },
  {
    path: 'Projects',
    loadComponent: () => import('./projects/projects').then((m) => m.Projects),
    // canActivate: [authGuard]
  },
  {
    path: 'Project/create',
    loadComponent: () =>
      import('./projects/project-create/project-create').then(
        (m) => m.ProjectCreate
      ),
  },
  {
    path: 'Project/list',
    loadComponent: () =>
      import('./projects/project-list/project-list').then((m) => m.ProjectList)
  },
  {
    path: '**',
    redirectTo: '/Home',
  },
];

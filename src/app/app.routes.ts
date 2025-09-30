import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login-component/login-component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./dashboard/home-component/home-component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/project-list/project-list').then((m) => m.ProjectList),
    canActivate: [authGuard],
  },
  {
    path: 'project/create',
    loadComponent: () =>
      import('./projects/project-create/project-create').then(
        (m) => m.ProjectCreate
      ),
    canActivate: [authGuard],
  },
  {
    path: 'project/list',
    loadComponent: () =>
      import('./projects/project-list/project-list').then((m) => m.ProjectList),
    canActivate: [authGuard],
  },
  {
    path: 'project/view/:id',
    loadComponent: () => import('./projects/project-details/project-details').then((m) => m.ProjectDetails),
    canActivate: [authGuard],
  },
  {
    path: 'project/edit/:id',
    loadComponent: () => import('./projects/project-edit/project-edit').then((m) => m.ProjectEdit),
    canActivate: [authGuard],
  },
  {
    path: 'team/list',
    loadComponent: () => import('./team/team-list/team-list').then((m) => m.TeamList),
    canActivate: [authGuard],
  },
  {
    path: 'team/add',
    loadComponent: () => import('./team/add-member/add-member').then((m) => m.AddMember),
    canActivate: [authGuard],
  },
  {
    path: 'team/assign/:id',
    loadComponent: () => import('./team/assign-team/assign-team').then((m) => m.AssignTeam),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

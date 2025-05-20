import { Routes } from '@angular/router';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basicos',
        loadComponent: () =>
          import('./pages/basic-page/basic-page.component').then(
            (m) => m.BasicPageComponent
          ),
      },
      {
        path: 'dynamic',
        title: 'Dinamicos',
        loadComponent: () =>
          import('./pages/dynamic-page/dynamic-page.component').then(
            (m) => m.DynamicPageComponent
          ),
      },
      {
        path: 'switches',
        title: 'Switches',
        loadComponent: () =>
          import('./pages/switches-page/switches-page.component').then(
            (m) => m.SwitchesPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];

import { Routes } from '@angular/router';

export const countryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'country',
        title: 'Paises',
        loadComponent: () =>
          import('./pages/country-page/country-page.component').then(
            (m) => m.CountryPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'country',
      },
    ],
  },
];

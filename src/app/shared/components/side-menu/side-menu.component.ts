import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { authRoutes } from '../../../auth/auth.routes';
import { countryRoutes } from '../../../country/country.routes';
interface MenuItem {
  title: string;
  route: string;
}
const reactiveItems = reactiveRoutes[0].children ?? [];
const authItems = authRoutes[0].children ?? [];
const countryItems = countryRoutes[0].children ?? [];
@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      title: `${item.title}`,
      route: `/reactive/${item.path}`,
    }));

  authMenu: MenuItem[] = authItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      title: `${item.title}`,
      route: `/auth/${item.path}`,
    }));

  countryMenu: MenuItem[] = countryItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      title: `${item.title}`,
      route: `/country/${item.path}`,
    }));
}

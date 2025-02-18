import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { IMenuItem } from '../../models/menu.model';
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MenuItemComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  getRolUser(){
    let userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      return JSON.parse(userLocalStorage).role;
    }
  }
  
  menu: IMenuItem[] = [
    {
      title: 'Products',
      icon: 'bar_chart',
      isAdmin: this.getRolUser() === 'ADMIN' ? true : false,
      link: 'products',
    },
    {
      title: 'Orders',
      icon: 'shopping_cart',
      isAdmin: this.getRolUser() === 'ADMIN' ? true : false,
      link: 'orders',
    },
  ];

  constructor() {
    if (this.getRolUser() === 'ADMIN') {
      this.menu.push({
        title: 'Users',
        icon: 'people',
        isAdmin: true,
        link: 'users',
      });
    }
  }
}

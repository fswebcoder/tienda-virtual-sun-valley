import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
 
  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = '';
  _router: Router = inject(Router);
  ngOnInit(): void {
    this.getUser();
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  getUser() {
    let userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      this.user = JSON.parse(userLocalStorage).name;
    }
  }
}

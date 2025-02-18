import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-item',
  imports: [ MatListModule, RouterLink, RouterLinkActive, MatIconModule,MatExpansionModule, CommonModule ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() menu: any;
}

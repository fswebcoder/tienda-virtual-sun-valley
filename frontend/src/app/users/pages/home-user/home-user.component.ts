import { Component } from '@angular/core';
import { UsersSmartComponent } from '../../components/smart/users-smart/users-smart.component';

@Component({
  selector: 'app-home-user',
  imports: [UsersSmartComponent],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss'
})
export class HomeUserComponent {

}

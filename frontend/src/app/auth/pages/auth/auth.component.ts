import { Component } from '@angular/core';
import { AuthSmartComponent } from '../../components/smart/auth-smart.component';

@Component({
  selector: 'app-auth',
  imports: [AuthSmartComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}

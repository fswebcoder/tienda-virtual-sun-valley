import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
import { AuthDumpComponent } from '../dump/auth-dump.component';
import { AuthService } from '../../services/auth.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { LoginDto } from '../../models/login.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-smart',
  imports: [AuthDumpComponent],
  templateUrl: './auth-smart.component.html',
  styleUrl: './auth-smart.component.scss',
  providers: [AuthService, MatSnackBarModule]
})
export class AuthSmartComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    const accessToken = localStorage.getItem('token');
    console.log('accessToken', accessToken);  
    if(accessToken){
      this._router.navigate(['/store']);
    }
  } 

   authService  = inject(AuthService);
   private _snackBar = inject(MatSnackBar);
   private _router = inject(Router);
   durationInSeconds = 5;

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';


  login(loginDto: LoginDto): void {
    this.authService.login(loginDto).subscribe({
      next: (respose) => {
        console.log('respose', respose);
        if(respose.access_token !== null){
          this.openSnackBar('¡Sesión iniciada!');

          this._router.navigate(['/store/products']);
        }
      },
      error: (error) => {
        this.openSnackBar('Error al iniciar sesión');
      } 
    })
  }

    openSnackBar(mensaje: string): void {
        this._snackBar.open(mensaje, 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginDto } from '../models/login.dto';
import { ResponseLoginModel } from '../models/respuesta-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3500';
  private http = inject(HttpClient);
  private router = inject(Router);


  login(loginDto: LoginDto): Observable<ResponseLoginModel> {
    return this.http.post<ResponseLoginModel>(`${this.apiUrl}/auth/login`, loginDto).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']);
      })
    );
  }

  getToken() {
    let userLocalStorage = localStorage.getItem('token');
    return userLocalStorage;
  }

}

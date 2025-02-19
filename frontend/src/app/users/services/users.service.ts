import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, ResponseUsersModel } from '../../shared/models/response-users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private apiUrl = 'http://localhost:3500';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}


  getAllUsers(page: number, limit: number) : Observable<ResponseUsersModel> {
    return this.http.get<ResponseUsersModel>(`${this.apiUrl}/users/all?page=${page}&limit=${limit}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  saveUser(user: IUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`, user);
  }

}

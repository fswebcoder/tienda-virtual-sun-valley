import { Component, inject, OnDestroy } from '@angular/core';
import { UsersDumpComponent } from '../../dump/users-dump/users-dump.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UsersService } from '../../../services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../../../shared/models/response-users.model';

@Component({
  selector: 'app-users-smart',
  imports: [UsersDumpComponent],
  templateUrl: './users-smart.component.html',
  styleUrl: './users-smart.component.scss',
})
export class UsersSmartComponent implements OnDestroy {

  dataUsers: IUser[] = [];
  total: number = 0;
  totalPages: number = 0;
  private _snackBar = inject(MatSnackBar);
  private _usersService = inject(UsersService);
  private destroy$ = new Subject<void>();

  durationInSeconds = 5;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getAllUsers(event: any): void {
    this._usersService
      .getAllUsers(event.page, event.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dataUsers = data.users;
        this.total = data.total;
        this.totalPages = data.totalPages;
      });
  }

  deleteUser(id: string): void {
    this._usersService.deleteUser(id).subscribe({
      next: (response) => {
        if(response.message !== null){
          this.openSnackBar(response.message);
          this.getAllUsers({ page: 1, limit: 5 });
        }
      },
      error: () => {
        this.openSnackBar('Error al eliminar el usuario');
      },
    });
  } 

  saveUser(user: IUser): void {
    this._usersService.saveUser(user).subscribe({
      next: (response) => {
        if(response.message !== null){
          this.openSnackBar('Usuario guardado correctamente');
          this.getAllUsers({ page: 1, limit: 5 });
        }
      },
      error: () => {
        this.openSnackBar('Error al guardar el usuario');
      },
    });
  }

  openSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

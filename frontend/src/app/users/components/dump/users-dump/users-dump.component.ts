import { MatCardModule } from '@angular/material/card';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../../../shared/models/response-users.model';
import { CreateEditUserComponent } from '../../../../shared/components/create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-users-dump',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './users-dump.component.html',
  styleUrl: './users-dump.component.scss',
})
export class UsersDumpComponent implements OnInit {
 
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'passwor',
    'rol',
    'actions',
  ];

  _users: IUser[] = [];
  @Input() set users(value: IUser[]) {
    this._users = value;
  }

  _total: number = 0;
  @Input() set total(value: number) {
    this._total = value;
  }

  _totalPages: number = 0;
  @Input() set totalPages(value: number) {
    this._totalPages = value;
  }
  @Output() emitSearch = new EventEmitter();
  @Output() emitDeleteUser = new EventEmitter();
  @Output() emitSaveuser = new EventEmitter();


  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAllUsers(1, 4);
  }

  onPageChange(event: PageEvent) {
    this.getAllUsers(event.pageIndex + 1, event.pageSize);
  }

  getAllUsers(page: number, limit: number): void {
    this.emitSearch.emit({ page, limit });
  }

  get users() {
    return this._users;
  }

  get totalPages() {
    return this._totalPages;
  }

  get total() {
    return this._total;
  }

  deleteProuct(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
          this.emitDeleteUser.emit(id)
      }
    });
  }

    createEdiUser(product?: IUser) {
      const dialogRef = this.dialog.open(CreateEditUserComponent, {
        width: '80vw',
        maxWidth: '600px',
        height: '90vh',
        maxHeight: '600px',
        data: product ?? null,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result) {
          this.emitSaveuser.emit(result);
        }
      });
    }

}

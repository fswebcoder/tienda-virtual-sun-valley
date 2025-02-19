import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DecimalPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditProductModalComponent } from '../../../../shared/components/edit-product-modal/edit-product-modal.component';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageBase64: string;
}

@Component({
  selector: 'app-products-dump',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  templateUrl: './products-dump.component.html',
  styleUrl: './products-dump.component.scss',
  providers: [],
})
export class ProductsDumpComponent implements OnInit {

  
  _products: Product[] = [];  
  @Input() set products(value: Product[]) {
    this._products = value;
  }

  _total: number = 0;  
  @Input() set total(value: number) {
    this._total = value;
  }

  _totalPages: number = 0;  
  @Input() set totalPages(value: number) {
    this._totalPages = value;
  }

  get products() {
    return this._products;
  }

  get totalPages() {
    return this._totalPages;
  }

  get total() {
    return this._total;
  }

  rol: string = '';

  readonly dialog = inject(MatDialog);
  @Output()  emitSearch  = new  EventEmitter();
  @Output()  emitUpdateProduct  = new  EventEmitter();
  @Output()  deleteProductByid  = new  EventEmitter();


  ngOnInit() {
    this.getRole()
    this.getAllProducts(1, 10);

  }

  getAllProducts(page: number, limit: number): void {
    this.emitSearch.emit({page, limit});
  }



  getRole() {
    let userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      this.rol = JSON.parse(userLocalStorage).role;
    }
  }

  onPageChange(event: PageEvent) {
    this.getAllProducts(event.pageIndex + 1, event.pageSize);
  }

  createEditProduct(product?: Product) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '80vw',
      maxWidth: '600px',
      height: '90vh',
      maxHeight: '600px',
      data: product ?? null,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.emitUpdateProduct.emit(result);
      }
    });
  }

  deleteProduct(id: string) {
     this.deleteProductByid.emit(id);
  }
}

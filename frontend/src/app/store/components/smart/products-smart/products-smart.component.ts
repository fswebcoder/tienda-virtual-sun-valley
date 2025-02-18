import { Component, inject } from '@angular/core';
import { ProductsDumpComponent } from '../../dump/products-dump/products-dump.component';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../../shared/models/response-products.model';
import { EditProductDto } from '../../../models/editar-producto.dto';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-smart',
  imports: [ProductsDumpComponent],
  templateUrl: './products-smart.component.html',
  styleUrl: './products-smart.component.scss',
  providers: [ProductService],
})
export class ProductsSmartComponent {
  products: IProduct[] = [];
  total: number = 0;
  totalPages: number = 0;
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private productService: ProductService) {}

  getAllProducts(event: any): void {
    this.productService
      .getAllProducts(event.page, event.limit)
      .subscribe((data) => {
        this.products = data.products;
        this.total = data.total;
        this.totalPages = data.totalPages;
      });
  }

  saveProduct(product: EditProductDto) {
    this.productService.saveProduct(product).subscribe(() => {
      if (product.id) {
        this.openSnackBar('Producto actualizado correctamente');
      }
      this.openSnackBar('Producto creado correctamente');
      this.getAllProducts({ page: 1, limit: 5 });
    });
  }

  openSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        if(response.message){
          this.openSnackBar('Producto eliminado correctamente');
          this.getAllProducts({ page: 1, limit: 5 });
        }
      },
      error: (error) => {
        this.openSnackBar('Error al eliminar el producto');
      },
    })
  }
}

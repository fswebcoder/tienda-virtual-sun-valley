import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseProductModel } from '../../shared/models/response-products.model';
import { EditProductDto } from '../models/editar-producto.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  private router = inject(Router);
 

  getAllProducts(page: number, limit:number): Observable<ResponseProductModel> {
    return this.http.get<ResponseProductModel>(`${this.apiUrl}/products/all?page=${page}&limit=${limit}`);
  }

  saveProduct(product: EditProductDto): Observable<any> {

    const params = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageBase64: product.imageBase64
    };

    const url = !product.isCreate ? `${this.apiUrl}/products/${product.id}` : `${this.apiUrl}/products/create`;
    const method = !product.isCreate ? 'patch' : 'post';
    return this.http[method](url, params);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

}

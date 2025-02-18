import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../interfaces/product.repository';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from 'src/presentation/dtos/products/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository') private readonly productRepository: IProductRepository
  ) {}

  async execute(product: CreateProductDto): Promise<Product> {
    const newProduct = new Product(
      crypto.randomUUID(),
      product.name,
      product.description,
      product.price,
      product.stock, 
      product.imageBase64
    );
    return this.productRepository.create(newProduct);
  }


}

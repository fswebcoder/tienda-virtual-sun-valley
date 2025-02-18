import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../interfaces/product.repository';
import { Product } from '../../entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository') private readonly productRepository: IProductRepository
  ) {}

  async execute(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }


}

import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../interfaces/product.repository';
import { Product } from '../../entities/product.entity';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('IProductRepository') private readonly productRepository: IProductRepository
  ) {}

  async execute(id: string, productData: Partial<Omit<Product, 'id'>>): Promise<Product> {
    return this.productRepository.update(id, productData);
  }
}

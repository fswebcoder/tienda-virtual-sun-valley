import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../interfaces/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('IProductRepository') private readonly productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<void> {
    return this.productRepository.delete(id);
  }
}

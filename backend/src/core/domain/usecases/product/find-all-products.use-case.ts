import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../interfaces/product.repository';

@Injectable()
export class FindAllProductsUseCase {
  constructor(
    @Inject('IProductRepository') private readonly productRepository: IProductRepository
  ) {}

  async execute(page: number, limit: number): Promise<{ products: any[], total: number, totalPages: number }> {
    const { products, total } = await this.productRepository.findAll(page, limit);
    const totalPages = Math.ceil(total / limit);

    return { products, total, totalPages };
  }
}

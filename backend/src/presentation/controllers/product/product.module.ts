import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from 'src/core/domain/usecases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/core/domain/usecases/product/find-all-products.use-case';
import { PrismaProductRepository } from 'src/infrastructure/prisma/products/prisma-product.repository';
import { PersistencePrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { UpdateProductUseCase } from 'src/core/domain/usecases/user/update-product.use-case';
import { DeleteProductUseCase } from 'src/core/domain/usecases/product/delete-product.use-case';

@Module({
    imports: [PersistencePrismaModule],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    FindAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    { provide: 'IProductRepository', useClass: PrismaProductRepository },
  ],
  exports: [CreateProductUseCase, FindAllProductsUseCase, UpdateProductUseCase, DeleteProductUseCase],
})
export class ProductModule {}

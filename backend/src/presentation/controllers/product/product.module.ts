import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from 'src/core/domain/usecases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/core/domain/usecases/product/find-all-products.use-case';
import { PrismaProductRepository } from 'src/infrastructure/prisma/prisma-product.repository';
import { PersistencePrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
    imports: [PersistencePrismaModule],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    FindAllProductsUseCase,
    { provide: 'IProductRepository', useClass: PrismaProductRepository },
  ],
  exports: [CreateProductUseCase, FindAllProductsUseCase],
})
export class ProductModule {}

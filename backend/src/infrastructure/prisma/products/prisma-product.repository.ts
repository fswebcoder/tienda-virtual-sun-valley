import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IProductRepository } from '../../../core/domain/interfaces/product.repository';
import { Product } from '../../../core/domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageBase64: product.imageBase64
      },
    });
    return new Product(createdProduct.id, createdProduct.name, createdProduct.description, createdProduct.price, createdProduct.stock, createdProduct.imageBase64!);
  }

 

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return new Product(product.id, product.name, product.description, product.price, product.stock, product.imageBase64!);
  }

  async update(id: string, product: Partial<Omit<Product, 'id'>>): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: product 
    });

    return new Product(updatedProduct.id, updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.stock, updatedProduct.imageBase64!);
  }

  async delete(id: string): Promise<void> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const orderItem = await this.prisma.orderItem.findFirst({ where: { productId: id } });
    if (orderItem) {
      throw new ConflictException('No se puede eliminar el producto porque está asociado a una orden.');
    }

    await this.prisma.product.delete({ where: { id } });
  }

  async findAll(page: number, limit: number): Promise<{ products: Product[], total: number }> {
    const skip = (page - 1) * limit;
  
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        orderBy: {
          name: 'desc' // Order by creation date in descending order
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          imageBase64: true
        }
      }),
      this.prisma.product.count()
    ]);
  
    return { 
      products: products.map(p => new Product(p.id, p.name, p.description, p.price, p.stock, p.imageBase64 == null ? 'https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png' : p.imageBase64!)),
      total
    };
  }
}

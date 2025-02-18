import { Test, TestingModule } from '@nestjs/testing';
import { PrismaProductRepository } from './prisma-product.repository';
import { PrismaService } from '../prisma.service';
import { Product } from '../../../core/domain/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('PrismaProductRepository', () => {
    let repository: PrismaProductRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaProductRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        product: {
                            create: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                            findMany: jest.fn(),
                            count: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        repository = module.get<PrismaProductRepository>(PrismaProductRepository);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should create a product', async () => {
        const product = new Product('1', 'Product 1', 'Description 1', 100, 10, 'imageBase64');
        (prisma.product.create as jest.Mock).mockResolvedValue(product);

        const result = await repository.create(product);

        expect(result).toEqual(product);
        expect(prisma.product.create).toHaveBeenCalledWith({
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imageBase64: product.imageBase64,
            },
        });
    });

    it('should find a product by id', async () => {
        const product = new Product('1', 'Product 1', 'Description 1', 100, 10, 'imageBase64');
        (prisma.product.findUnique as jest.Mock).mockResolvedValue(product);

        const result = await repository.findById('1');

        expect(result).toEqual(product);
        expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException if product not found by id', async () => {
        (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(repository.findById('1')).rejects.toThrow(NotFoundException);
    });

    it('should update a product', async () => {
        const product = new Product('1', 'Product 1', 'Description 1', 100, 10, 'imageBase64');
        (prisma.product.update as jest.Mock).mockResolvedValue(product);

        const result = await repository.update('1', { name: 'Updated Product' });

        expect(result).toEqual(product);
        expect(prisma.product.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: { name: 'Updated Product' },
        });
    });

    it('should delete a product', async () => {
        (prisma.product.delete as jest.Mock).mockResolvedValue(undefined);

        await repository.delete('1');

        expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should find all products with pagination', async () => {
        const products = [
            new Product('1', 'Product 1', 'Description 1', 100, 10, 'imageBase64'),
            new Product('2', 'Product 2', 'Description 2', 200, 20, 'imageBase64'),
        ];
        (prisma.product.findMany as jest.Mock).mockResolvedValue(products);
        (prisma.product.count as jest.Mock).mockResolvedValue(2);

        const result = await repository.findAll(1, 2);

        expect(result).toEqual({ products, total: 2 });
        expect(prisma.product.findMany).toHaveBeenCalledWith({
            skip: 0,
            take: 2,
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock: true,
                imageBase64: true,
            },
        });
        expect(prisma.product.count).toHaveBeenCalled();
    });
});
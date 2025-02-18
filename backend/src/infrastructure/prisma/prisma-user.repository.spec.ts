import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserRepository } from './prisma-user.repository';
import { PrismaService } from './prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../../core/domain/entities/user.entity';
import { ERol } from '@prisma/client';

describe('PrismaUserRepository', () => {
    let repository: PrismaUserRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaUserRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            create: jest.fn(),
                            findUnique: jest.fn(),
                            delete: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        repository = module.get<PrismaUserRepository>(PrismaUserRepository);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const user = new User('1', 'John Doe', 'john@example.com', 'password', ERol.USER);
            (prisma.user.create as jest.Mock).mockResolvedValue(user);

            const result = await repository.createUser(user);

            expect(result).toEqual(user);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    rol: user.rol,
                },
            });
        });

        it('should throw ConflictException if email is already in use', async () => {
            const user = new User('1', 'John Doe', 'john@example.com', 'password', ERol.USER);
            (prisma.user.create as jest.Mock).mockRejectedValue({ code: 'P2002' });

            await expect(repository.createUser(user)).rejects.toThrow(ConflictException);
        });
    });

    describe('findByEmail', () => {
        it('should return a user if found', async () => {
            const user = new User('1', 'John Doe', 'john@example.com', 'password', ERol.USER);
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

            const result = await repository.findByEmail('john@example.com');

            expect(result).toEqual(user);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
        });

        it('should return null if user is not found', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await repository.findByEmail('john@example.com');

            expect(result).toBeNull();
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
        });
    });

    describe('findById', () => {
        it('should return a user if found', async () => {
            const user = new User('1', 'John Doe', 'john@example.com', 'password', ERol.USER);
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

            const result = await repository.findById('1');

            expect(result).toEqual(user);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
        });

        it('should return null if user is not found', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await repository.findById('1');

            expect(result).toBeNull();
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
        });
    });

    describe('deleteUser', () => {
        it('should delete a user if found', async () => {
            const user = new User('1', 'John Doe', 'john@example.com', 'password', ERol.USER);
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
            (prisma.user.delete as jest.Mock).mockResolvedValue(undefined);

            await repository.deleteUser('1');

            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
        });

        it('should throw NotFoundException if user is not found', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(repository.deleteUser('1')).rejects.toThrow(NotFoundException);
        });
    });
});
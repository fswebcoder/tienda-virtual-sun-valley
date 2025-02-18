import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '../../core/domain/interfaces/user.repository';
import { User } from '../../core/domain/entities/user.entity';
import { ERol } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          rol: user.rol,
        },
      });
      return new User(createdUser.id, createdUser.name, createdUser.email, createdUser.password, createdUser.rol);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El email ya está en uso');
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new User(user.id, user.name, user.email, user.password, user.rol as ERol) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

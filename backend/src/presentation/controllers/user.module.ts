import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../core/domain/usecases/user/create-user.use-case';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaUserRepository } from 'src/infrastructure/prisma/prisma-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    PrismaUserRepository, 
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    CreateUserUseCase, 
  ],
  exports: [CreateUserUseCase], 
})
export class UserModule {}

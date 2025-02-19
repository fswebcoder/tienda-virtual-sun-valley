import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../../core/domain/usecases/user/create-user.use-case';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaUserRepository } from 'src/infrastructure/prisma/users/prisma-user.repository';
import { DeleteUserUseCase } from 'src/core/domain/usecases/user/delete-user.use-case';
import { FindAllUsersUseCase } from 'src/core/domain/usecases/user/find-users.use-case';
import { UpdateUserUseCase } from 'src/core/domain/usecases/user/update-user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    PrismaUserRepository, 
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    CreateUserUseCase, 
    DeleteUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase
  ],
  exports: [CreateUserUseCase, DeleteUserUseCase, FindAllUsersUseCase, UpdateUserUseCase], 
})
export class UserModule {}
 
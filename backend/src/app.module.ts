import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/prisma/prisma-user.repository';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { UserModule } from './presentation/controllers/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [PrismaService, PrismaUserRepository],
})
export class AppModule {}

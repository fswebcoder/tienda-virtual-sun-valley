import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/users/user.controller';
import { PrismaUserRepository } from './infrastructure/prisma/prisma-user.repository';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { UserModule } from './presentation/controllers/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ProductModule } from './presentation/controllers/product/product.module';

@Module({
  imports: [AuthModule, UserModule,ProductModule, ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [PrismaService, PrismaUserRepository],
})
export class AppModule {}

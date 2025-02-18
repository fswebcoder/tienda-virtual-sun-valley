import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './users/prisma-user.repository';

@Module({
  providers: [PrismaService, PrismaUserRepository, ], 
  exports: [PrismaService, PrismaUserRepository], 
})
export class PersistencePrismaModule {}

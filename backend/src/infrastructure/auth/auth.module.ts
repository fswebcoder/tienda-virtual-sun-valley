import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaUserRepository } from '../prisma/prisma-user.repository';
import { PersistencePrismaModule } from '../prisma/prisma.module';
import { LoginUseCase } from 'src/core/domain/usecases/auth/login.use-case';
import { AuthController } from 'src/presentation/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PersistencePrismaModule
  ],
  providers: [
    LoginUseCase,
    JwtStrategy,
    { provide: 'IUserRepository', useClass: PrismaUserRepository }, // ✅ Registrar repositorio
  ],
})
export class AuthModule {}

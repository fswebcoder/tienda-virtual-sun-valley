import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from '../../core/domain/usecases/auth/login.use-case';

@ApiTags('Auth')
@Controller('auth') 
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login') 
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso', schema: { example: { access_token: 'JWT_TOKEN' } } })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto.email, loginDto.password);
  }
}
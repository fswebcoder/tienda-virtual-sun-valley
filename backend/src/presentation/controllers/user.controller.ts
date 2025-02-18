import { Controller, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../../core/domain/usecases/user/create-user.use-case';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Role } from '../../infrastructure/auth/roles.decorator';
import { PrismaUserRepository } from 'src/infrastructure/prisma/prisma-user.repository';
import { UserResponseDto } from '../dtos/user-response.dto';

@ApiTags('Users') 
@Controller('users')
export class UserController {
  constructor(
    private readonly userRepository: PrismaUserRepository,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  @Post('create')
  @ApiBody({ type: CreateUserDto }) 
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.', type: UserResponseDto }) // ✅ Muestra el tipo de respuesta
  @ApiResponse({ status: 400, description: 'Error en la solicitud.' })
  @ApiResponse({ status: 401, description: 'Usuario no autorizado' })
  @ApiResponse({ status: 500, description: 'Error en servidor.' })
  async createUser(@Body() userDto: CreateUserDto) {
    return this.createUserUseCase.execute(userDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async deleteUser(@Param('id') id: string) {
    return this.userRepository.delete(id);
  }
}

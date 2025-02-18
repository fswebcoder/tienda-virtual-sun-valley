import { Controller, Post, Body, Delete, Param, UseGuards, ParseUUIDPipe, Req, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { CreateUserUseCase } from '../../../core/domain/usecases/user/create-user.use-case';
import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Role } from '../../../infrastructure/auth/roles.decorator';
import { PrismaUserRepository } from 'src/infrastructure/prisma/prisma-user.repository';
import { UserResponseDto } from '../../dtos/user-response.dto';
import { DeleteUserUseCase } from 'src/core/domain/usecases/user/delete-user.use-case';
import { FindAllUsersUseCase } from 'src/core/domain/usecases/user/find-users.use-case';
import { AllUserResponse } from '../../dtos/all-user-response';

@ApiTags('Users') 
@Controller('users')
export class UserController {
  constructor(
    private readonly userRepository: PrismaUserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  @Post('create')
  @ApiBody({ type: CreateUserDto }) 
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.', type: UserResponseDto }) 
  @ApiResponse({ status: 400, description: 'Error en la solicitud.' })
  @ApiResponse({ status: 401, description: 'Usuario no autorizado' })
  @ApiResponse({ status: 500, description: 'Error en servidor.' })
  async createUser(@Body() userDto: CreateUserDto, @Req() req) {
    return this.createUserUseCase.execute(userDto, req.user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'No tienes permisos para eliminar usuarios' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    await this.deleteUserUseCase.execute(id);
    return { message: 'Usuario eliminado correctamente' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuarios consultados', type: AllUserResponse }) 
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'No tienes permisos para eliminar usuarios' })
  @ApiResponse({ status: 404, description: 'No se encontraron resultados.' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.findAllUsersUseCase.execute(Number(page), Number(limit));
  }
}

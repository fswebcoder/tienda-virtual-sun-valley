import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ERol } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'Fabio Sánchez', description: 'Nombre del usuario' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'fabio@example.com', description: 'Correo electrónico único' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'ADMIN', enum: ERol, description: 'Rol del usuario (ADMIN o USER)' })
  @IsEnum(ERol)
  @IsNotEmpty()
  rol: ERol;
}

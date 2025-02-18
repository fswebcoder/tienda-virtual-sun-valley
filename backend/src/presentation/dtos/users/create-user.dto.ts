import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Fabio Sánchez', description: 'Nombre del usuario' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({ example: 'fabio@example.com', description: 'Correo del usuario' })
  @IsEmail({}, { message: 'El email debe ser válido' }) // ✅ Asegurar que la validación está aquí
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @ApiProperty({ example: 'ADMIN', description: 'Rol del usuario', enum: ['ADMIN', 'USER'] })
  @IsEnum(['ADMIN', 'USER'], { message: 'El rol enviado es inválido.' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  rol: 'ADMIN' | 'USER';
}

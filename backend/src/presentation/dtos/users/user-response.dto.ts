import { ApiProperty } from '@nestjs/swagger';
import { ERol } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-1234-5678', description: 'ID único del usuario' })
  id: string;

  @ApiProperty({ example: 'Fabio Sánchez', description: 'Nombre del usuario' })
  name: string;

  @ApiProperty({ example: 'fabio@example.com', description: 'Correo electrónico único' })
  email: string;

  @ApiProperty({ example: 'ADMIN', enum: ERol, description: 'Rol del usuario' })
  rol: ERol;
}

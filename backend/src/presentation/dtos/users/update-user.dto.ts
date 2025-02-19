import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'Fabio Sánchez', description: 'Nombre del usuario' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name: string;

    @ApiProperty({
        example: 'fabio@gmail.com',
        description: 'Nombre del usuario',
    })
    @IsOptional()
    @IsEmail({}, { message: 'El email no es válido' })
    email?: string;

    @ApiProperty({ example: '**************', description: 'Password' })
    @IsOptional()
    @ValidateIf((o) => o.password !== null && o.password !== '')
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password?: string;

    @ApiProperty({
        example: 'ADMIN',
        description: 'Rol del usuario',
        enum: ['ADMIN', 'USER'],
    })
    @IsEnum(['ADMIN', 'USER'], { message: 'El rol enviado es inválido.' })
    @IsOptional()
    @IsString()
    role?: string;
}

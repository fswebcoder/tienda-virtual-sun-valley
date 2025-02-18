import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ERol } from '@prisma/client';

describe('CreateUserDto', () => {
    it('should validate with correct data', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Fabio Sánchez';
        dto.email = 'fabio@example.com';
        dto.password = 'password123';
        dto.rol = ERol.ADMIN;

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should not validate without name', async () => {
        const dto = new CreateUserDto();
        dto.name = '';
        dto.email = 'fabio@example.com';
        dto.password = 'password123';
        dto.rol = ERol.ADMIN;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('name');
    });

    it('should not validate with invalid email', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Fabio Sánchez';
        dto.email = 'invalid-email';
        dto.password = 'password123';
        dto.rol = ERol.ADMIN;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('email');
    });

    it('should not validate with short password', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Fabio Sánchez';
        dto.email = 'fabio@example.com';
        dto.password = '123';
        dto.rol = ERol.ADMIN;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('password');
    });

    it('should not validate with invalid role', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Fabio Sánchez';
        dto.email = 'fabio@example.com';
        dto.password = 'password123';
        dto.rol = 'INVALID_ROLE' as ERol;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('rol');
    });
});
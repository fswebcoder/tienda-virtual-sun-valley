import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infraestructure/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async validacionUsuario(email: string, password: string) {
       try {
        const user = await this.prismaService.usuario.findUnique({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
          const { password, ...result } = user;
          return result;
        }
       } catch (error) {
        throw new UnauthorizedException('Error de autenticación');
       }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.rol };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}

import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private readonly usersRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(email: string, password: string) {
    console.log('LoginUseCase.execute', email, password);   
    const user = await this.usersRepository.findByEmail(email);

    const encriptar =  await bcrypt.hash(password, 10);
    console.log('encriptar', encriptar);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, role: user.rol };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.rol,
      }
    };
  }
}

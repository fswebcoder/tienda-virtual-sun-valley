import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/presentation/dtos/users/create-user.dto';
import { IUserRepository } from '../../interfaces/user.repository';

@Injectable() 
export class CreateUserUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}


  async execute(userDto: CreateUserDto, adminRole: string): Promise<User> {
     if (adminRole !== 'ADMIN') {
          throw new ForbiddenException('No tienes permisos para eliminar usuarios');
        }
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const newUser = new User(
        crypto.randomUUID(), 
        userDto.name,
        userDto.email,
        hashedPassword,
        userDto.rol 
      );
      return this.userRepository.createUser(newUser);
    }
}
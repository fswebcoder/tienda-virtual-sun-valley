import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.repository';
import { User } from '@prisma/client';


@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository,
  ) {}


  async execute(id: string, userData: Partial<User>): Promise<User> {
    return this.userRepository.update(id, userData);
  }
}

import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute( userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }
}



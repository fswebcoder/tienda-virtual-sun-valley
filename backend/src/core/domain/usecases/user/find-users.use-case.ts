import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute(page: number, limit: number): Promise<{ users: any[], total: number, totalPages: number }> {
    const { users, total } = await this.userRepository.findAll(page, limit);
    const totalPages = Math.ceil(total / limit);

    return { users, total, totalPages };
  }
}

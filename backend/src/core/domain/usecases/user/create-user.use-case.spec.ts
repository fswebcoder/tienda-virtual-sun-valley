import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { DeleteUserUseCase } from './delete-user.use-case';
import { IUserRepository } from '../../interfaces/user.repository';

describe('DeleteUserUseCase', () => {
    let deleteUserUseCase: DeleteUserUseCase;
    let userRepository: IUserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteUserUseCase,
                {
                    provide: 'IUserRepository',
                    useValue: {
                        deleteUser: jest.fn(),
                    },
                },
            ],
        }).compile();

        deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
        userRepository = module.get<IUserRepository>('IUserRepository');
    });

    it('should be defined', () => {
        expect(deleteUserUseCase).toBeDefined();
    });

    it('should throw ForbiddenException if adminRole is not ADMIN', async () => {
        await expect(deleteUserUseCase.execute('USER', 'some-user-id')).rejects.toThrow(ForbiddenException);
    });

    it('should call userRepository.deleteUser if adminRole is ADMIN', async () => {
        const userId = 'some-user-id';
        await deleteUserUseCase.execute('ADMIN', userId);
        expect(userRepository.deleteUser).toHaveBeenCalledWith(userId);
    });
});
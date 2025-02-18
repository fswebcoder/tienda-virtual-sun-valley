// import { Test, TestingModule } from '@nestjs/testing';
// import { CreateUserUseCase } from './create-user.use-case';
// import { IUserRepository } from '../../interfaces/user.repository';
// import { User } from '../../entities/user.entity';
// import { ForbiddenException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { CreateUserDto } from 'src/presentation/dtos/create-user.dto';

// // Mock del Repositorio de Usuario
// const userRepositoryMock: Partial<IUserRepository> = {
//   createUser: jest.fn(),
// };

// describe('CreateUserUseCase', () => {
//   let createUserUseCase: CreateUserUseCase;
//   let userRepository: IUserRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CreateUserUseCase,
//         { provide: 'IUserRepository', useValue: userRepositoryMock },
//       ],
//     }).compile();

//     createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
//     userRepository = module.get<IUserRepository>('IUserRepository');
//   });

//   it('Debe crear un usuario cuando el rol es ADMIN', async () => {
//     // Datos de prueba
//     const userDto: CreateUserDto = {
//       name: 'Fabio Sánchez',
//       email: 'fabio@example.com',
//       password: 'password123',
//       rol: 'USER',
//     };

//     const hashedPassword = await bcrypt.hash(userDto.password, 10);
//     const expectedUser = new User(expect.any(String), userDto.name, userDto.email, hashedPassword, userDto.rol);

//     // Simulación de `createUser` en el repositorio
//     (userRepository.createUser as jest.Mock).mockResolvedValue(expectedUser);

//     // Ejecución
//     const result = await createUserUseCase.execute(userDto, 'ADMIN');

//     // Verificaciones
//     expect(result).toEqual(expectedUser);
//     expect(userRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
//       name: userDto.name,
//       email: userDto.email,
//       password: expect.any(String), // Contraseña encriptada
//       rol: userDto.rol,
//     }));
//   });

//   it('Debe lanzar ForbiddenException si el usuario no es ADMIN', async () => {
//     const userDto: CreateUserDto = {
//       name: 'Karol Villamizar',
//       email: 'karol@example.com',
//       password: 'password123',
//       rol: 'USER',
//     };

//     await expect(createUserUseCase.execute(userDto, 'USER')).rejects.toThrow(
//       new ForbiddenException('No tienes permisos para eliminar usuarios'),
//     );
//   });

//   it('Debe encriptar la contraseña antes de crear el usuario', async () => {
//     const userDto: CreateUserDto = {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: 'password123',
//       rol: 'USER',
//     };

//     const mockCreateUser = jest.spyOn(userRepository, 'createUser').mockResolvedValue(
//       new User(expect.any(String), userDto.name, userDto.email, 'hashedPassword', userDto.rol),
//     );

//     await createUserUseCase.execute(userDto, 'ADMIN');

//     expect(mockCreateUser).toHaveBeenCalledWith(expect.objectContaining({
//       password: expect.not.stringMatching(userDto.password), // Debe estar encriptada
//     }));
//   });

//   it('Debe llamar al método createUser del IUserRepository', async () => {
//     const userDto: CreateUserDto = {
//       name: 'Alice',
//       email: 'alice@example.com',
//       password: 'password123',
//       rol: 'USER',
//     };

//     const expectedUser = new User(expect.any(String), userDto.name, userDto.email, 'hashedPassword', userDto.rol);
//     const mockCreateUser = jest.spyOn(userRepository, 'createUser').mockResolvedValue(expectedUser);

//     await createUserUseCase.execute(userDto, 'ADMIN');

//     expect(mockCreateUser).toHaveBeenCalledTimes(1);

//     expect(userRepository.createUser).toHaveBeenCalledTimes(1);
//   });
// });

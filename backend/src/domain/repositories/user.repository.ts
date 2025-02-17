import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
    findByEmail(email: string): Promise<UserEntity>;
    save(user: UserEntity): Promise<void>;
    update(user: UserEntity): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
}
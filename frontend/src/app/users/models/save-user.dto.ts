export class SaveUserDto {
    name: string;
    email: string;
    password: string;
    rol: string;

    constructor(name: string, email: string, password: string, rol: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}
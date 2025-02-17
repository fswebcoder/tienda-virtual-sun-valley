import { TRol } from "src/general/types";

export class UserEntity {
  constructor(
    public id: number,
    public name: string,    
    public email: string,
    public password: string,
    public roles: TRol,
  ) {}
}
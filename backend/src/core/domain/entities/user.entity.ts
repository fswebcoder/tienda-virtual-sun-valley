export class User {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly email: string,
      public readonly password: string | null,
      public readonly rol: 'ADMIN' | 'USER',
    ) {}
  }
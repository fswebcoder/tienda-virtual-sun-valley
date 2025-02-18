export class Product {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly description: string | null,
      public readonly price: number,
      public readonly stock: number,
      public readonly imageBase64?: string 
    ) {}
  }
  
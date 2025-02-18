export class EditProductDto {
   id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageBase64: string;
  isCreate?: boolean ;

    constructor( id:string, name: string, description: string, price: number, stock: number, image: string, isCreate: boolean = true) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageBase64 = image;
        this.isCreate = isCreate;
    }
}
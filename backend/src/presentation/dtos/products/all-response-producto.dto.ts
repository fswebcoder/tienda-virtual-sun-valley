import { ApiProperty } from "@nestjs/swagger";
import { Product, User } from "@prisma/client";

export class AllProductResponse {

     @ApiProperty({ 
        example: [
            {
                "id": "uuid-1234-5678",
                "name": "Camiseta",
                "description": "Camiseta de algodón",
                "price": 10,
                "quantity": 5,
                "imageBase64": "https://www.anm.gov.co/sites/default/files/boletin-minerales_1.jpg"
              }]
     })
     users: Product[];

    @ApiProperty({ example: 10 })
    total: number;

    @ApiProperty({ example: 5 })
    totalPages: number;



}
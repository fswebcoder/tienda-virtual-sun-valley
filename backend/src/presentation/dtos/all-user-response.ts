import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class AllUserResponse {

     @ApiProperty({ 
        example: [
            {
                id: 'uuid-1234-5678',
                name: 'Fabio Sánchez',
                email: 'fabio@pruebatecnica.com.co',
                passwor:null,
                rol: 'ADMIN'
            }
        ],
     })
     users: User[];

    @ApiProperty({ example: 10 })
    total: number;

    @ApiProperty({ example: 5 })
    totalPages: number;



}
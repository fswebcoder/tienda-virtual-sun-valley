import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Camiseta', description: 'Nombre del producto' })
      @IsNotEmpty({ message: 'El nombre es obligatorio' })
      name: string;
    
      @ApiProperty({ example: 'Camiseta de algodón', description: 'Descripción del producto' })
      @IsNotEmpty({ message: 'La descripción es obligatoria' })
      description: string;
    
      @ApiProperty({ example: 10, description: 'Precio del producto' })
      @IsNumber({}, { message: 'El precio debe ser un número' })
      @IsNotEmpty({ message: 'El precio es obligatorio' })
      price: number;
    
      @ApiProperty({ example: 5, description: 'Cantidad de productos' })
      @IsNumber({}, { message: 'La cantidad debe ser un número' })
      @IsNotEmpty({ message: 'La cantidad es obligatoria' })
      stock: number;
  
      @ApiProperty({ example: 'https://www.anm.gov.co/sites/default/files/boletin-minerales_1.jpg', description: 'URL de la imagen' })
      @IsNotEmpty({ message: 'La imagen es obligatoria' })
      imageBase64: string;
}
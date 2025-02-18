import { Controller, Get, Post, Body, UseGuards, Query, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateProductUseCase } from 'src/core/domain/usecases/product/create-product.use-case';
import { DeleteProductUseCase } from 'src/core/domain/usecases/product/delete-product.use-case';
import { FindAllProductsUseCase } from 'src/core/domain/usecases/product/find-all-products.use-case';
import { UpdateProductUseCase } from 'src/core/domain/usecases/user/update-product.use-case';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateProductDto } from 'src/presentation/dtos/products/create-product.dto';
import { ResponseProductDto } from 'src/presentation/dtos/products/response-product.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBody({ type: CreateProductDto }) 
  @ApiResponse({ status: 201, description: 'Producto creado', type : ResponseProductDto })
  
  async create(@Body() productDto:CreateProductDto) {
    return this.createProductUseCase.execute(productDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [ResponseProductDto] })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.findAllProductsUseCase.execute(Number(page), Number(limit));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBody({ type: CreateProductDto }) 
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente', type: ResponseProductDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async update(@Param('id') id: string, @Body() productData) {
    return this.updateProductUseCase.execute(id, productData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente', })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 409, description: 'No se puede eliminar el producto porque está en una orden' })
  async delete(@Param('id') id: string) {
    await this.deleteProductUseCase.execute(id);
    return { message: 'Producto eliminado correctamente' };
  }

}

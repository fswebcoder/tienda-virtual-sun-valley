import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateProductUseCase } from 'src/core/domain/usecases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/core/domain/usecases/product/find-all-products.use-case';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateProductDto } from 'src/presentation/dtos/create-product.dto';
import { ResponseProductDto } from 'src/presentation/dtos/response-product.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBody({ type: CreateProductDto }) 
  @ApiResponse({ status: 201, description: 'Producto creado', type : ResponseProductDto })
  
  async create(@Body() productDto) {
    return this.createProductUseCase.execute(productDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.findAllProductsUseCase.execute(Number(page), Number(limit));
  }
}

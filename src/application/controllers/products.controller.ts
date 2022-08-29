import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductHttpBody } from '@application/documentation/product.http.body';
import { CreateProductAdapter } from '@infrastructure/adapters/usecases/product/create-product.adapter';
import { ProductDto } from '@core/dtos/product.dto';
import {
  createProductUseCasePort,
  getProductsUseCasePort,
  getProductUseCasePort,
  removeProductUseCasePort,
  updateProductUseCasePort,
} from '@core/common/constants/di-constants-tokens';
import { CreateProductUseCasePort } from '@core/domain/usecases/create-product.usecase.port';
import { JwtAuthGuard } from '@application/auth/jwt-auth.guard';
import { GetProductsFromCategoryAdapter } from '@infrastructure/adapters/usecases/product/get-products-from-category.adapter';
import { GetProductsUseCasePort } from '@core/domain/usecases/get-products.usecase.port';
import { GetProductFromIdAdapter } from '@infrastructure/adapters/usecases/product/get-product-from-id.adapter';
import { GetProductUseCasePort } from '@core/domain/usecases/get-product.usecase.port';
import { UpdateProductUseCasePort } from '@core/domain/ports/usecases/user/update-product.usecase.port';
import { UpdateProductAdapter } from '@infrastructure/adapters/usecases/product/update-product.adapter';
import { RemoveProductUseCasePort } from '@core/domain/ports/usecases/user/remove-product.usecase.port';
import { RemoveProductAdapter } from '@infrastructure/adapters/usecases/product/remove-product.adapter';

@ApiTags('Users Controller')
@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  public constructor(
    @Inject(createProductUseCasePort)
    private readonly _createProductUseCasePort: CreateProductUseCasePort,
    @Inject(getProductsUseCasePort)
    private readonly _getProductsUseCasePort: GetProductsUseCasePort,
    @Inject(getProductUseCasePort)
    private readonly _getProductUseCasePort: GetProductUseCasePort,
    @Inject(updateProductUseCasePort)
    private readonly _updateProductUseCasePort: UpdateProductUseCasePort,
    @Inject(removeProductUseCasePort)
    private readonly _removeProductUseCasePort: RemoveProductUseCasePort,
  ) {}

  @Post()
  @ApiBody({ type: ProductHttpBody })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create new product.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Wrong data' })
  public async create(@Body() payload: ProductHttpBody): Promise<ProductDto> {
    const adapter: CreateProductAdapter = await CreateProductAdapter.new({
      name: payload.name,
      description: payload.description,
      category: payload.category,
      stock: payload.stock,
      price: payload.price,
      thumbnails: payload.thumbnails,
    });

    return this._createProductUseCasePort.execute(adapter);
  }

  @Get('/:category')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Search category incorrect' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found by category' })
  public async getFromCategory(@Param('category') category: string): Promise<Array<ProductDto>> {
    const adapter: GetProductsFromCategoryAdapter = await GetProductsFromCategoryAdapter.new({
      category: category,
    });

    return this._getProductsUseCasePort.execute(adapter);
  }

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Search id incorrect' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found by id' })
  public async getFromId(@Param('id') id: string): Promise<ProductDto> {
    const adapter: GetProductFromIdAdapter = await GetProductFromIdAdapter.new({
      id: id,
    });

    return this._getProductUseCasePort.execute(adapter);
  }

  @Patch('/:id')
  @ApiBody({ type: ProductHttpBody })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return updated product' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No data found for update' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data for update product' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error to edit product' })
  public async patch(@Param('id') id: string, @Body() payload: ProductHttpBody): Promise<ProductDto> {
    const adapter: UpdateProductAdapter = await UpdateProductAdapter.new({
      id: id,
      name: payload.name,
      description: payload.description,
      category: payload.category,
      stock: payload.stock,
      price: payload.price,
      thumbnails: payload.thumbnails,
    });

    return this._updateProductUseCasePort.execute(adapter);
  }

  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Return deleted product' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No data found for delete' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Error to delete product' })
  public async delete(@Param('id') id: string): Promise<ProductDto> {
    const adapter: RemoveProductAdapter = await RemoveProductAdapter.new({
      id: id,
    });

    return this._removeProductUseCasePort.execute(adapter);
  }
}

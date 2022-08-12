import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ProductHttpBody } from '@application/documentation/product.http.body';
import { CreateProductAdapter } from '@infrastructure/adapters/usecases/product/create-product.adapter';
import { ProductDto } from '@core/dtos/product.dto';
import { createProductUseCasePort } from '@core/common/constants/di-constants-tokens';
import { CreateProductUseCasePort } from '@core/domain/usecases/create-product.usecase.port';
import { JwtAuthGuard } from "@application/auth/jwt-auth.guard";

@ApiTags('Users Controller')
@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  public constructor(
    @Inject(createProductUseCasePort)
    private readonly _createProductUseCasePort: CreateProductUseCasePort,
  ) {}

  @Post()
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
}

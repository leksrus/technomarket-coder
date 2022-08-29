import { GetProductUseCasePort } from '@core/domain/usecases/get-product.usecase.port';
import { Inject, Injectable } from '@nestjs/common';
import { ProductDto } from '@core/dtos/product.dto';
import { GetProductFromIdPort } from '@core/domain/ports/usecases/product/get-product-from-id.port';
import { productRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { ProductRepositoryPort } from '@core/domain/ports/persistence/product.repository.port';
import { Product } from '@core/domain/entities/product';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class GetProductUseCase implements GetProductUseCasePort {
  public constructor(
    @Inject(productRepositoryPort)
    private readonly _productRepositoryPort: ProductRepositoryPort,
  ) {}
  public async execute(payload: GetProductFromIdPort): Promise<ProductDto> {
    const product: Nullable<Product> = await this._productRepositoryPort.findById(payload.id);

    if (product) return ProductDto.toProductDto(product);

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, GetProductUseCase.name);
  }
}

import { GetProductsUseCasePort } from '@core/domain/usecases/get-products.usecase.port';
import { GetProductsFromCategoryPort } from '@core/domain/ports/usecases/product/get-products-from-category.port';
import { ProductDto } from '@core/dtos/product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Nullable } from '@core/common/types/common-types';
import { Product } from '@core/domain/entities/product';
import { productRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { ProductRepositoryPort } from '@core/domain/ports/persistence/product.repository.port';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class GetProductsUseCase implements GetProductsUseCasePort {
  public constructor(
    @Inject(productRepositoryPort)
    private readonly _productRepositoryPort: ProductRepositoryPort,
  ) {}
  public async execute(payload: GetProductsFromCategoryPort): Promise<Array<ProductDto>> {
    const products: Nullable<Array<Product>> = await this._productRepositoryPort.findByCategory(payload.category);

    if (products) return ProductDto.toProductListDto(products);

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, GetProductsUseCase.name);
  }
}

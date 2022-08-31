import { GetAllProductsUseCasePort } from '@core/domain/usecases/get-all-products.usecase.port';
import { ProductDto } from '@core/dtos/product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { productRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { ProductRepositoryPort } from '@core/domain/ports/persistence/product.repository.port';
import { Nullable } from '@core/common/types/common-types';
import { Product } from '@core/domain/entities/product';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class GetAllProductsUseCase implements GetAllProductsUseCasePort {
  public constructor(
    @Inject(productRepositoryPort)
    private readonly _productRepositoryPort: ProductRepositoryPort,
  ) {}
  public async execute(): Promise<Array<ProductDto>> {
    const products: Nullable<Array<Product>> = await this._productRepositoryPort.findAll();

    if (products) return ProductDto.toProductListDto(products);

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, GetAllProductsUseCase.name);
  }
}

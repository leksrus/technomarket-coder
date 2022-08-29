import { RemoveProductUseCasePort } from '@core/domain/ports/usecases/user/remove-product.usecase.port';
import { RemoveProductPort } from '@core/domain/ports/usecases/product/remove-product.port';
import { ProductDto } from '@core/dtos/product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { productRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { ProductRepositoryPort } from '@core/domain/ports/persistence/product.repository.port';
import { Nullable } from '@core/common/types/common-types';
import { Product } from '@core/domain/entities/product';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class RemoveProductUseCase implements RemoveProductUseCasePort {
  public constructor(
    @Inject(productRepositoryPort)
    private readonly _productRepositoryPort: ProductRepositoryPort,
  ) {}
  public async execute(payload: RemoveProductPort): Promise<ProductDto> {
    const product: Nullable<Product> = await this._productRepositoryPort.findById(payload.id);

    if (product) {
      const editedProduct: Nullable<Product> = await this._productRepositoryPort.remove(product);

      return ProductDto.toProductDto(editedProduct);
    }

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, RemoveProductUseCase.name);
  }
}

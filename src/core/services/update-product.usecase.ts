import { UpdateProductUseCasePort } from '@core/domain/ports/usecases/user/update-product.usecase.port';
import { UpdateProductPort } from '@core/domain/ports/usecases/product/update-product.port';
import { ProductDto } from '@core/dtos/product.dto';
import { Nullable } from '@core/common/types/common-types';
import { Product } from '@core/domain/entities/product';
import { Inject, Injectable } from '@nestjs/common';
import { productRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { ProductRepositoryPort } from '@core/domain/ports/persistence/product.repository.port';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class UpdateProductUseCase implements UpdateProductUseCasePort {
  public constructor(
    @Inject(productRepositoryPort)
    private readonly _productRepositoryPort: ProductRepositoryPort,
  ) {}
  public async execute(payload: UpdateProductPort): Promise<ProductDto> {
    const product: Nullable<Product> = await this._productRepositoryPort.findById(payload.id);

    if (product) {
      product.edit(payload);

      const editedProduct: Nullable<Product> = await this._productRepositoryPort.update(product);

      return ProductDto.toProductDto(editedProduct);
    }

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, UpdateProductUseCase.name);
  }
}

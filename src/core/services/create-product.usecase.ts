import { CreateProductUseCasePort } from '@core/domain/usecases/create-product.usecase.port';
import { Inject, Injectable } from "@nestjs/common";
import { productRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { ProductRepositoryPort } from '@core/domain/ports/persistence/product.repository.port';
import { ProductDto } from '@core/dtos/product.dto';
import { CreateProductPort } from '@core/domain/ports/usecases/product/create-product.port';
import { Product } from '@core/domain/entities/product';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from "@core/common/exceptions/exception";
import { StatusCode } from "@core/common/codes/status-code";


@Injectable()
export class CreateProductUseCase implements CreateProductUseCasePort {
  public constructor(
    @Inject(productRepositoryPort)
    private readonly _productRepositoryPort: ProductRepositoryPort,
  ) {}

  public async execute(payload: CreateProductPort): Promise<ProductDto> {
    const product: Product = Product.new({
      name: payload.name,
      description: payload.description,
      stock: payload.stock,
      category: payload.category,
      price: payload.price,
      thumbnails: payload.thumbnails,
    });

    const newProduct: Nullable<Product> = await this._productRepositoryPort.add(product);

    if (newProduct) return ProductDto.toProductDto(newProduct);

    throw Exception.new(
      {
        code: StatusCode.INTERNAL_SERVER_ERROR,
        data: undefined,
      },
      CreateProductUseCase.name,
    );
  }
}

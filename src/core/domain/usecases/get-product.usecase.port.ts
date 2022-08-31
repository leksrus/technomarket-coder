import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { GetProductFromIdPort } from '@core/domain/ports/usecases/product/get-product-from-id.port';
import { ProductDto } from '@core/dtos/product.dto';

export interface GetProductUseCasePort extends BaseUseCase<GetProductFromIdPort, ProductDto> {}

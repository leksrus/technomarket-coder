import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { ProductDto } from '@core/dtos/product.dto';

export interface GetAllProductsUseCasePort extends BaseUseCase<void, Array<ProductDto>> {}

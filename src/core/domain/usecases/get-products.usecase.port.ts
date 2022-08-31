import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { ProductDto } from '@core/dtos/product.dto';
import { GetProductsFromCategoryPort } from '@core/domain/ports/usecases/product/get-products-from-category.port';

export interface GetProductsUseCasePort extends BaseUseCase<GetProductsFromCategoryPort, Array<ProductDto>> {}

import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { RemoveProductPort } from '@core/domain/ports/usecases/product/remove-product.port';
import { ProductDto } from '@core/dtos/product.dto';

export interface RemoveProductUseCasePort extends BaseUseCase<RemoveProductPort, ProductDto> {}

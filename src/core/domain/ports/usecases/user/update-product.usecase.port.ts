import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { UpdateProductPort } from '@core/domain/ports/usecases/product/update-product.port';
import { ProductDto } from '@core/dtos/product.dto';

export interface UpdateProductUseCasePort extends BaseUseCase<UpdateProductPort, ProductDto> {}

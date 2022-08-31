import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { ProductDto } from '@core/dtos/product.dto';
import { CreateProductPort } from "@core/domain/ports/usecases/product/create-product.port";

export interface CreateProductUseCasePort extends BaseUseCase<CreateProductPort, ProductDto> {}

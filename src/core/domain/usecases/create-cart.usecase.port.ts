import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { CartDto } from '@core/dtos/cart.dto';
import { CreateCartPort } from '@core/domain/ports/usecases/cart/create-cart.port';

export interface CreateCartUseCasePort extends BaseUseCase<CreateCartPort, CartDto> {}

import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { RemoveCartPort } from '@core/domain/ports/usecases/cart/remove-cart.port';
import { CartDto } from '@core/dtos/cart.dto';

export interface RemoveCartUseCasePort extends BaseUseCase<RemoveCartPort, CartDto> {}

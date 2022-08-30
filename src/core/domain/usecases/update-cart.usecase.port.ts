import { UpdateCartPort } from '@core/domain/ports/usecases/cart/update-cart.port';
import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { CartDto } from '@core/dtos/cart.dto';

export interface UpdateCartUseCasePort extends BaseUseCase<UpdateCartPort, CartDto> {}

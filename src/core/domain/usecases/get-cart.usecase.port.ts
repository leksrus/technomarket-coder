import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { GetCartFromId } from '@core/domain/ports/usecases/cart/get-cart-from-id';
import { CartDto } from '@core/dtos/cart.dto';

export interface GetCartUseCasePort extends BaseUseCase<GetCartFromId, CartDto> {}

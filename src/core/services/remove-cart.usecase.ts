import { Inject, Injectable } from '@nestjs/common';
import { RemoveCartUseCasePort } from '@core/domain/usecases/remove-cart.usecase.port';
import { CartDto } from '@core/dtos/cart.dto';
import { RemoveCartPort } from '@core/domain/ports/usecases/cart/remove-cart.port';
import { cartRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { CartRepositoryPort } from '@core/domain/ports/persistence/cart.repository.port';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';
import { Cart } from '@core/domain/entities/cart';

@Injectable()
export class RemoveCartUseCase implements RemoveCartUseCasePort {
  public constructor(
    @Inject(cartRepositoryPort)
    private readonly _cartRepositoryPort: CartRepositoryPort,
  ) {}
  public async execute(payload: RemoveCartPort): Promise<CartDto> {
    const cart: Nullable<Cart> = await this._cartRepositoryPort.findById(payload.id);

    if (cart) {
      const removedCart: Nullable<Cart> = await this._cartRepositoryPort.remove(cart);

      return CartDto.toCartDto(removedCart);
    }

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, RemoveCartUseCase.name);
  }
}

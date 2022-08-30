import { UpdateCartPort } from '@core/domain/ports/usecases/cart/update-cart.port';
import { UpdateCartUseCasePort } from '@core/domain/usecases/update-cart.usecase.port';
import { CartDto } from '@core/dtos/cart.dto';
import { Inject, Injectable } from '@nestjs/common';
import { cartRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { CartRepositoryPort } from '@core/domain/ports/persistence/cart.repository.port';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';
import { Cart } from '@core/domain/entities/cart';
import { Item } from '@core/domain/entities/item';

@Injectable()
export class UpdateCartUseCase implements UpdateCartUseCasePort {
  public constructor(
    @Inject(cartRepositoryPort)
    private readonly _cartRepositoryPort: CartRepositoryPort,
  ) {}
  public async execute(payload: UpdateCartPort): Promise<CartDto> {
    const cart: Nullable<Cart> = await this._cartRepositoryPort.findById(payload.id);

    if (cart) {
      cart.edit(payload);
      if (payload.items) cart.items = payload.items.map((x) => Item.new(x));

      const editedCart: Nullable<Cart> = await this._cartRepositoryPort.update(cart);

      return CartDto.toCartDto(editedCart);
    }

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, UpdateCartUseCase.name);
  }
}

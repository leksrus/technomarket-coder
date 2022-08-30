import { CreateCartPort } from '@core/domain/ports/usecases/cart/create-cart.port';
import { CreateCartUseCasePort } from '@core/domain/usecases/create-cart.usecase.port';
import { Inject, Injectable } from '@nestjs/common';
import { cartRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { CartRepositoryPort } from '@core/domain/ports/persistence/cart.repository.port';
import { CartDto } from '@core/dtos/cart.dto';
import { Cart } from '@core/domain/entities/cart';
import { Item } from '@core/domain/entities/item';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class CreateCartUseCase implements CreateCartUseCasePort {
  public constructor(
    @Inject(cartRepositoryPort)
    private readonly _cartRepositoryPort: CartRepositoryPort,
  ) {}
  public async execute(payload: CreateCartPort): Promise<CartDto> {
    const cart: Cart = Cart.new({
      email: payload.email,
      orderAddress: payload.orderAddress,
    });

    if (payload.items) cart.items = payload.items.map((x) => Item.new(x));

    const newCart: Nullable<Cart> = await this._cartRepositoryPort.add(cart);

    if (newCart) return CartDto.toCartDto(newCart);

    throw Exception.new(
      {
        code: StatusCode.INTERNAL_SERVER_ERROR,
        data: undefined,
      },
      CreateCartUseCase.name,
    );
  }
}

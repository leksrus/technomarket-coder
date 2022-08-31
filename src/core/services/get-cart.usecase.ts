import { GetCartFromId } from '@core/domain/ports/usecases/cart/get-cart-from-id';
import { CartDto } from '@core/dtos/cart.dto';
import { Inject, Injectable } from '@nestjs/common';
import { cartRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { CartRepositoryPort } from '@core/domain/ports/persistence/cart.repository.port';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';
import { Cart } from '@core/domain/entities/cart';
import { GetCartUseCasePort } from "@core/domain/usecases/get-cart.usecase.port";

@Injectable()
export class GetCartUseCase implements GetCartUseCasePort {
  public constructor(
    @Inject(cartRepositoryPort)
    private readonly _cartRepositoryPort: CartRepositoryPort,
  ) {}
  public async execute(payload: GetCartFromId): Promise<CartDto> {
    const cart: Nullable<Cart> = await this._cartRepositoryPort.findById(payload.id);

    if (cart) return CartDto.toCartDto(cart);

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, GetCartUseCase.name);
  }
}

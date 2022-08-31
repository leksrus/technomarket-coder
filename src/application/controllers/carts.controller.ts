import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@application/auth/jwt-auth.guard';
import { CreateCartUseCasePort } from '@core/domain/usecases/create-cart.usecase.port';
import { createCartUseCasePort, getCartUseCasePort, removeCartUseCasePort, updateCartUseCasePort } from '@core/common/constants/di-constants-tokens';
import { GetCartUseCasePort } from '@core/domain/usecases/get-cart.usecase.port';
import { UpdateCartUseCasePort } from '@core/domain/usecases/update-cart.usecase.port';
import { RemoveCartUseCasePort } from '@core/domain/usecases/remove-cart.usecase.port';
import { CartHttpBody } from '@application/documentation/cart.http.body';
import { CartDto } from '@core/dtos/cart.dto';
import { CreateCartAdapter } from '@infrastructure/adapters/usecases/cart/create-cart.adapter';
import { GetCartFromIdAdapter } from '@infrastructure/adapters/usecases/cart/get-cart-from-id.adapter';
import { UpdateCartAdapter } from '@infrastructure/adapters/usecases/cart/update-cart.adapter';
import { RemoveCartAdapter } from '@infrastructure/adapters/usecases/cart/remove-cart.adapter';

@ApiTags('Carts Controller')
@Controller('/carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  public constructor(
    @Inject(createCartUseCasePort)
    private readonly _createCartUseCasePort: CreateCartUseCasePort,
    @Inject(getCartUseCasePort)
    private readonly _getCartUseCasePort: GetCartUseCasePort,
    @Inject(updateCartUseCasePort)
    private readonly _updateCartUseCasePort: UpdateCartUseCasePort,
    @Inject(removeCartUseCasePort)
    private readonly _removeCartUseCasePort: RemoveCartUseCasePort,
  ) {}

  @Post()
  @ApiBody({ type: CartHttpBody })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create new cart.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Wrong data' })
  public async create(@Body() payload: CartHttpBody): Promise<CartDto> {
    const adapter: CreateCartAdapter = await CreateCartAdapter.new({
      email: payload.email,
      orderAddress: payload.orderAddress,
      items: payload.items,
    });

    return this._createCartUseCasePort.execute(adapter);
  }

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Search id incorrect' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cart not found by id' })
  public async getFromId(@Param('id') id: string): Promise<CartDto> {
    const adapter: GetCartFromIdAdapter = await GetCartFromIdAdapter.new({
      id: id,
    });

    return this._getCartUseCasePort.execute(adapter);
  }

  @Patch('/:id')
  @ApiBody({ type: CartHttpBody })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return updated cart' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No data found for update' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data for update cart' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error to edit cart' })
  public async patch(@Param('id') id: string, @Body() payload: CartHttpBody): Promise<CartDto> {
    const adapter: UpdateCartAdapter = await UpdateCartAdapter.new({
      id: id,
      email: payload.email,
      orderAddress: payload.orderAddress,
      items: payload.items,
    });

    return this._updateCartUseCasePort.execute(adapter);
  }

  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Return deleted cart' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No data found for delete' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Error to delete cart' })
  public async delete(@Param('id') id: string): Promise<CartDto> {
    const adapter: RemoveCartAdapter = await RemoveCartAdapter.new({
      id: id,
    });

    return this._removeCartUseCasePort.execute(adapter);
  }
}

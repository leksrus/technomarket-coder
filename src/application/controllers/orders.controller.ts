import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@application/auth/jwt-auth.guard';
import { createOrderUseCasePort, getOrdersUseCasePort } from '@core/common/constants/di-constants-tokens';
import { CreateOrderUseCasePort } from '@core/domain/usecases/create-order.usecase.port';
import { GetOrdersUseCasePort } from '@core/domain/usecases/get-orders.usecase.port';
import { OrderHttpBody } from '@application/documentation/order.http.body';
import { OrderDto } from '@core/dtos/order.dto';
import { CreateOrderAdapter } from '@infrastructure/adapters/usecases/order/create-order.adapter';
import { GetOrdersFromEmailAdapter } from '@infrastructure/adapters/usecases/order/get-orders-from-email.adapter';

@ApiTags('Orders Controller')
@Controller('/orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  public constructor(
    @Inject(createOrderUseCasePort)
    private readonly _createOrderUseCasePort: CreateOrderUseCasePort,
    @Inject(getOrdersUseCasePort)
    private readonly _getOrdersUseCasePort: GetOrdersUseCasePort,
  ) {}

  @Post()
  @ApiBody({ type: OrderHttpBody })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create new order.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Wrong data' })
  public async create(@Body() payload: OrderHttpBody): Promise<OrderDto> {
    const adapter: CreateOrderAdapter = await CreateOrderAdapter.new({
      email: payload.email,
      status: payload.status,
      items: payload.items,
    });

    return this._createOrderUseCasePort.execute(adapter);
  }

  @Get('/:email')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Search email incorrect' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orders not found by category' })
  public async getFromCategory(@Param('email') email: string): Promise<Array<OrderDto>> {
    const adapter: GetOrdersFromEmailAdapter = await GetOrdersFromEmailAdapter.new({
      email: email,
    });

    return this._getOrdersUseCasePort.execute(adapter);
  }
}

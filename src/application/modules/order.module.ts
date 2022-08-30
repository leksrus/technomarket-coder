import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { createOrderUseCasePort, getOrdersUseCasePort, orderRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { orderSchema, OrderSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/order.schema';
import { OrderRepositoryAdapter } from '@infrastructure/adapters/persistence/mogoose/repository/order.repository.adapter';
import { CreateOrderUseCase } from '@core/services/create-order.usecase';
import { GetOrdersUseCase } from '@core/services/get-orders.usecase';
import { OrdersController } from "@application/controllers/orders.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderSchema.name, schema: orderSchema }])],
  controllers: [OrdersController],
  providers: [
    {
      provide: orderRepositoryPort,
      useClass: OrderRepositoryAdapter,
    },
    {
      provide: createOrderUseCasePort,
      useClass: CreateOrderUseCase,
    },
    {
      provide: getOrdersUseCasePort,
      useClass: GetOrdersUseCase,
    },
  ],
})
export class OrderModule {}

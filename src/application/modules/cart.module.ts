import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  cartRepositoryPort,
  createCartUseCasePort,
  getCartUseCasePort,
  removeCartUseCasePort,
  updateCartUseCasePort,
} from '@core/common/constants/di-constants-tokens';
import { cartSchema, CartSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/cart.schema';
import { CartsController } from '@application/controllers/carts.controller';
import { CartRepositoryAdapter } from '@infrastructure/adapters/persistence/mogoose/repository/cart.repository.adapter';
import { CreateCartUseCase } from '@core/services/create-cart.usecase';
import { GetCartUseCase } from '@core/services/get-cart.usecase';
import { UpdateCartUseCase } from '@core/services/update-cart.usecase';
import { RemoveCartUseCase } from '@core/services/remove-cart.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: CartSchema.name, schema: cartSchema }])],
  controllers: [CartsController],
  providers: [
    {
      provide: cartRepositoryPort,
      useClass: CartRepositoryAdapter,
    },
    {
      provide: createCartUseCasePort,
      useClass: CreateCartUseCase,
    },
    {
      provide: getCartUseCasePort,
      useClass: GetCartUseCase,
    },
    {
      provide: updateCartUseCasePort,
      useClass: UpdateCartUseCase,
    },
    {
      provide: removeCartUseCasePort,
      useClass: RemoveCartUseCase,
    },
  ],
})
export class CartModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomExceptionFilter } from '@application/exception.filters/custom.exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from '@application/modules/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@application/modules/product.module';
import { CartModule } from '@application/modules/cart.module';
import { OrderModule } from '@application/modules/order.module';
import { MessageModule } from '@application/modules/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductModule,
    CartModule,
    OrderModule,
    MessageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class RootModule {}

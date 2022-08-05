import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomExceptionFilter } from '@application/exception.filters/custom.exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class RootModule {}

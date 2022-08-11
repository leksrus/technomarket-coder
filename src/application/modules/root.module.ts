import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CustomExceptionFilter } from '@application/exception.filters/custom.exception.filter';
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { UsersModule } from "@application/modules/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtAuthGuard } from "@application/auth/jwt-auth.guard";

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
  UsersModule ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class RootModule {}

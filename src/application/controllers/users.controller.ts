import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserDto } from "@core/dtos/user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserHttpBody } from "@application/documentation/user.http.body";
import { CreateUserAdapter } from "@infrastructure/adapters/usecases/user/create-user.adapter";
import { parse, extname } from 'path';
import { createUserUseCasePort } from "@core/common/constants/di-constants-tokens";
import { CreateUserUseCasePort } from "@core/domain/usecases/create-user.usecase.port";


@ApiTags('Users Controller')
@Controller('/users')
export class UsersController {
  public constructor(@Inject(createUserUseCasePort)
                     private _createUserUseCasePort: CreateUserUseCasePort) {
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('file'))
  public async createUser(@UploadedFile() file: Express.Multer.File, @Body() payload: UserHttpBody): Promise<UserDto> {

    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      birthDate: payload.birthDate,
      address: payload.address,
      phone: payload.phone,
      avatarFile: {
        name: parse(file.originalname).name,
        extension: extname(file.originalname),
        data: file.buffer
      }
    })

    return this._createUserUseCasePort.execute(adapter);
  }
}
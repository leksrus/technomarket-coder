import { HashHelperPort } from '@core/domain/ports/encryption/hash-helper.port';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashHelperAdapter implements HashHelperPort {
  private readonly _salt: number;

  public constructor(private readonly _configService: ConfigService) {
    this._salt = parseInt(this._configService.get<string>('SALT'));
  }

  public hash(data: string): Promise<string> {
    return bcrypt.hash(data, this._salt);
  }

  public compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}

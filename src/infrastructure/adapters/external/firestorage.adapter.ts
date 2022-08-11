import { FilePort } from '@core/domain/ports/usecases/user/file.port';
import { FireStoragePort } from '@core/domain/ports/external/firestorage.port';
import { Injectable, Logger } from '@nestjs/common';
import { Bucket, File, GetSignedUrlResponse, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { format } from 'util';
import { Promise } from 'mongoose';


@Injectable()
export class FireStorageAdapter implements FireStoragePort {
  private readonly _storage: Storage;
  private readonly _buketName: string;
  private readonly _logger: Logger = new Logger(FireStorageAdapter.name);

  public constructor(private readonly _configService: ConfigService) {
    this._storage = new Storage({
      keyFilename: 'tech-market-firebase-adminsdk.json',
    });
    this._buketName = this._configService.get<string>('GCLOUD_STORAGE_BUCKET');
  }
  public async addFile(file: FilePort, folder: string): Promise<string> {
    const bucket: Bucket = this._storage.bucket(this._buketName);
    const blob: File = bucket.file(folder + file.name + file.extension);

    this._logger.log('... saving file to google storage ...');
    await blob.save(file.data);

    this._logger.log('... save file to google storage complete ...');
    const url: GetSignedUrlResponse = await blob.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    return format(url[0]);
  }
}

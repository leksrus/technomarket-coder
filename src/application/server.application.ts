import { RootModule } from '@application/modules/root.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule);
    const configService: ConfigService = app.get(ConfigService);
    const port: string = configService.get<string>('PORT');

    this.buildAPIDocumentation(app);

    await app.listen(port);
  }

  private buildAPIDocumentation = (app: NestExpressApplication): void => {
    const title: string = 'Customers Documents';
    const description: string = 'Customers Documents API documentation';
    const version: string = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('gs-hub/api/documentation', app, document);
  };
}

import { Constants } from '@app/common';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);

  const config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (error) => {
        Logger.error('Validate error');
        Logger.error(error);
        return new BadRequestException(error);
      },
    }),
  );

  const documentBuild = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuild);
  SwaggerModule.setup('docs', app, document);

  // Setup port
  const PORT = config.get<string>(Constants.PRODUCT_PORT);
  if (!PORT) {
    throw new InternalServerErrorException(
      `Can not get env ${Constants.PRODUCT_PORT}`,
    );
  }
  await app.listen(PORT, () =>
    Logger.log('Product app running on port: ' + PORT, 'Bootstrap'),
  );
}
bootstrap();

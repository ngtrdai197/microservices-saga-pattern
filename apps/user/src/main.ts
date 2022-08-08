import { Constants } from '@app/common';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const config = app.get(ConfigService);

  const documentBuild = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuild);
  SwaggerModule.setup('docs', app, document);

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
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9094'],
        },
        consumer: {
          groupId: 'kafka.mvc.user.consumer',
          allowAutoTopicCreation: true,
        },
        subscribe: {
          fromBeginning: true,
        },
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  // Setup port
  const PORT = config.get<string>(Constants.USER_PORT);
  if (!PORT) {
    throw new InternalServerErrorException(
      `Can not get env ${Constants.USER_PORT}`,
    );
  }
  await app.listen(PORT, () =>
    Logger.log('User app running on port: ' + PORT, 'Bootstrap'),
  );
}
bootstrap();

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
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
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
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9094'],
        },
        consumer: {
          groupId: 'kafka.mvc.order.consumer',
          allowAutoTopicCreation: true,
        },
        subscribe: {
          fromBeginning: true,
        },
      },
    },
    { inheritAppConfig: true },
  );
  // Setup port
  const PORT = config.get<string>(Constants.ORDER_PORT);
  if (!PORT) {
    throw new InternalServerErrorException(
      `Can not get env ${Constants.ORDER_PORT}`,
    );
  }
  await app.startAllMicroservices();
  await app.listen(PORT, () =>
    Logger.log('Order app running on port: ' + PORT, 'Bootstrap'),
  );
}
bootstrap();

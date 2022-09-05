import { Constants } from '@app/common';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const config = app.get(ConfigService);

  // Setup port
  const PORT = config.get<string>(Constants.ORDER_PORT);
  const KAFKA_URI = config.get<string>('kafka.uri');
  if (!PORT || !KAFKA_URI) {
    throw new Error(`Some env is not defined`);
  }
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
          brokers: [KAFKA_URI],
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
  await app.startAllMicroservices();
  await app.listen(PORT, () =>
    Logger.log('Order service started at port: ' + PORT, 'Bootstrap'),
  );
}

bootstrap();

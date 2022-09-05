import { NestFactory } from '@nestjs/core';
import { OrchestratorModule } from './orchestrator.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    OrchestratorModule,
  );
  const config = appContext.get(ConfigService);
  const PORT = config.get('ORCHESTRATOR_PORT');
  const KAFKA_URI = config.get('kafka.uri');
  if (!PORT || !KAFKA_URI) {
    throw new Error('Some env is not defined');
  }
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrchestratorModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [KAFKA_URI],
        },
        consumer: {
          groupId: 'kafka.mvc.orchestrator.consumer',
          allowAutoTopicCreation: true,
        },
        subscribe: {
          fromBeginning: true,
        },
      },
    },
  );
  await appContext.close();
  await app.listen();
  Logger.log('Orchestrator service started', 'Bootstrap');
}

bootstrap();

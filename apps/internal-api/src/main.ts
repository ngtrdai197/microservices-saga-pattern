import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { InternalApiModule } from './internal-api.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(InternalApiModule);
  const config = app.get(ConfigService);
  const PORT = config.get<number>('internal_api_port');
  if (!PORT) {
    throw new Error('Internal API port is not defined');
  }
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'internal.api',
      protoPath: join(__dirname, 'proto/internal.proto'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(PORT);
  console.log(`Internal API is running on: ${await app.getUrl()}`);
}

bootstrap();

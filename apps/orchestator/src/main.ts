import { NestFactory } from '@nestjs/core';
import { OrchestatorModule } from './orchestator.module';

async function bootstrap() {
  const app = await NestFactory.create(OrchestatorModule);
  await app.listen(3000);
}
bootstrap();

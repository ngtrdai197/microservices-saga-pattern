import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Partitioners, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private producer: Producer;

  constructor(private readonly configService: ConfigService) {
    const kafkaUri = this.configService.get('kafka.uri');
    if (!kafkaUri) {
      throw new Error('Kafka URI is not defined');
    }
    this.kafka = new Kafka({
      brokers: [kafkaUri],
    });

    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
      createPartitioner: Partitioners.LegacyPartitioner,
    });
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  public async publish(topic: string, data: Record<string, any>) {
    try {
      return this.producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(data),
            timestamp: new Date().getMilliseconds().toString(),
          },
        ],
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}

import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Partitioners, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      brokers: ['localhost:9094'],
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

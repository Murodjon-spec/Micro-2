import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function startApp() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://glfbncoo:OVhb5QEf74Ba8v7qvr0-RGkPthb89uyl@stingray.rmq.cloudamqp.com/glfbncoo'],
        queue: 'main_products_queue',
        queueOptions: {
          durable: false
        },
      },
    });
    app.listen();
  } catch (error) {
    console.log(error);
  }
}
startApp();

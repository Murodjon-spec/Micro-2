import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startApp() {
  try {
    const PORT = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    await app.listen(PORT, () => console.log("Service listening on port", +PORT));
  } catch (error) {
    console.log(error);
  }
}
startApp();

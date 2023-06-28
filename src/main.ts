import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove any properties that are not in the DTO}
    }),
  );
  await app.listen(3001);
}
bootstrap(); // bootstrap is a function that starts the Nest application,it is called bootstrap because it is the first function that is called when the application starts.

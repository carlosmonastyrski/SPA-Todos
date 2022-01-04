import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Todos')
  .setDescription('Todos Api')
  .setVersion('1.0')
  .addTag('todos')
  .build();

  const document = SwaggerModule.createDocument(app,options);

  SwaggerModule.setup('api/docs', app, document,{
    explorer: true,
    swaggerOptions: {
      filter:true,
      showRequestDuration: true
    }
  });
  app.enableCors();
  await app.listen(4000);
}
bootstrap();

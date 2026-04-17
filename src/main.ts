import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validasi Global
  app.useGlobalPipes(new ValidationPipe());

  // SETUP SWAGGER
  const config = new DocumentBuilder()
    .setTitle('RevoBank API')
    .setDescription('Dokumentasi API Perbankan Milestone 4 - Tommy Poernomo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Nanti akses di /api/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
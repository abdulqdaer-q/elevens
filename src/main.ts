import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe} from '@nestjs/common';
import "reflect-metadata";
import cors from "cors"
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors : true});
  const config = new DocumentBuilder()
  .setTitle('Elevens')
  .setVersion('1.0')
  .build();
  const pt = join(__dirname,'..','uploads');
  console.log({pt});
  
app.useStaticAssets(pt, {
  index: false,
  prefix:'/uploads'
})
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    })
  );
  
  await app.listen(3000);
}
bootstrap();

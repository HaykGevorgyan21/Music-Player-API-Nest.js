import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConst } from './constant/swagger.const';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function server() {
  const app = await NestFactory.create(AppModule);
  const docConfig = new DocumentBuilder()
    .setTitle('Song Service')
    .setDescription('Song Service APIs')
    .setVersion('1.0');

  for (const t of Object.values(swaggerConst.tag)) {
    docConfig.addTag(t);
  }
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const schema = SwaggerModule.createDocument(app, docConfig.build());
  SwaggerModule.setup('/service/api-docs', app, schema);
  await app.listen(3001);
}
server();

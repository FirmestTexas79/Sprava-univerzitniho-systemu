import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    cors: true,
  });
  // Enable validation globally for all endpoints
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: "X-API-Version",
    defaultVersion: "1",
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix("api/v1");

  //swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("API")
    .setDescription("API description")
    .setVersion("0.0.1")
    .addTag("API")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/v1", app, document);

  await app.listen(3001);
}

bootstrap();

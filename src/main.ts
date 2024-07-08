import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./auths/guards/jwt-auth.guard";
import cookieParser from "cookie-parser";
import { TransformInterceptor } from "./cores/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // Cors
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
  });

  // Global transform interceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // Global jwt guard
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Cookies
  app.use(cookieParser());

  // Validate data using class-validator
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<string>("PORT"));
}

bootstrap();

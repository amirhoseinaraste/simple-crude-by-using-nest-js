import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import {ValidationPipe} from '@nestjs/common'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

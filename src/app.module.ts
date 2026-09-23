import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'nestjs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }
), AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {  
  configure(consumer: import("@nestjs/common").MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

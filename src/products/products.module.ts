import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [TypeOrmModule.forFeature([Products])], // use TypeOrmModule.forFeature to register the Products entity
  controllers: [ProductsController],
  providers: [ProductsService, UsersService],
})
export class ProductsModule {}

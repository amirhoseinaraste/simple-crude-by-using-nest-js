import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import UserGuardDto from 'src/users/dto/user-guard.dto';

@Injectable()
export class ProductsService {
  constructor(
  @InjectRepository(Products)
  private readonly productsRepository: Repository<Products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    await this.productsRepository.save(product);
    return product;
  }

  async findAll() {
    return this.productsRepository.find({
      relations: {
        user: true
      }
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        user: true
      }
    });
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productsRepository.update({id, user: updateProductDto.user}, {...updateProductDto});
    if(updatedProduct.affected === 0){
      throw new HttpException('product not found', 404)
    }
    return {};
  }

  async remove(id: number, user: UserGuardDto) {
    const removedProduct = await this.productsRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.user', 'users')
      .where('products.id = id', {id})
      .andWhere('products.user = :user', {user: user.id})
      .getOne();

    if(!removedProduct){
      throw new HttpException('product not found', 404)
    }

    await this.productsRepository.remove(removedProduct)

    return {}
  }
}

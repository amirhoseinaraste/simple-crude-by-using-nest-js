import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Products } from './products.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

  @OneToMany(() => Products, (product) => product.user)
  products!: Products []; // This will hold the related products for the user
}
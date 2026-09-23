import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { join } from 'path';


@Entity('products')
export class Products {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true})
    name!: string;
    @Column({nullable: true})
    description!: string;
    @Column({nullable: true})
    price!: number;

    @Column('int',{nullable: true})
    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({ name: 'user' })
    user!: Users;
}

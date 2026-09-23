import { StringifyOptions } from "querystring";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm/browser";

@Entity('codes')
export class Codes {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable : false})
    email!:string;

    @Column({nullable: false})
    code!: number;

    @Column({nullable: true, default: false})
    is_used!: boolean

    @Column({nullable: false})
    expire!:Date

} 
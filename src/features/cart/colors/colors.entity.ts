import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('colors')
export class Color {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: 'varchar', length: 128, unique: true})
    title!: string;

    @Column({type: 'varchar', length: 10})
    color!: string;
}
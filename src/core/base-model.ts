import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";

export class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'timestamp'})
    createdAt!: string;

    @Column({type: 'timestamp', nullable: true })
    updatedAt?: string;
}
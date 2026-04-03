import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";

@Entity()
export class News extends BaseModel {
    @Column({ length: 256})
    title!: string;

    @Column({type: 'timestamp'})
    date!: string;

    @Column({ type: 'text'})
    content!: string;
}
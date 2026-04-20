import {Expose} from "class-transformer";

export class NewsDetailAdminDto {
    @Expose()
    id!: number;

    @Expose()
    title!: string;

    @Expose()
    date!: string;

    @Expose()
    content!: string;

    @Expose()
    createdAt!: string;

    @Expose()
    updateAt?: string;
}
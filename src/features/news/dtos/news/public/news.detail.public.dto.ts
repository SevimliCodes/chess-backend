import {Expose} from "class-transformer";

export class NewsDetailPublicDto {
    @Expose()
    id!: number;

    @Expose()
    title!: string;

    @Expose()
    date!: string;

    @Expose()
    content!: string;

}
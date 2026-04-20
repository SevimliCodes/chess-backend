import {Expose} from "class-transformer";

export class NewsListPublicDto {

    @Expose()
    id!: number;

    @Expose()
    title!: string;

    @Expose()
    date!: string;

    @Expose()
    content!: string;


}
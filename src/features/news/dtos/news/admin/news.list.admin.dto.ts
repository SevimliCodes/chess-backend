import {Expose} from "class-transformer";

export class NewsListAdminDto {


    @Expose()
    title!: string;

    @Expose()
    date!: string;

    @Expose()
    content!: string;
}
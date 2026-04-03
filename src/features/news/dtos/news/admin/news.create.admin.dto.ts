import {IsDate, IsDateString, IsString, MaxLength} from "class-validator";

export class NewsCreateAdminDto {
    @IsString()
    @MaxLength(256)
    title!: string;

    @IsDateString()
    date!: string;

    @IsString()
    content!: string;
}
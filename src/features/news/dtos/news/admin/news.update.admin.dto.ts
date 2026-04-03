import {IsDate, IsDateString, IsOptional, IsString, MaxLength} from "class-validator";

export class NewsUpdateAdminDto {
    @IsString()
    @MaxLength(256)
    @IsOptional()
    title?: string;

    @IsDateString()
    @IsOptional()
    date?: string;

    @IsString()
    @IsOptional()
    content?: string;
}
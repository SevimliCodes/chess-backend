import {IsInt, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class NewsFilters {
    @IsString()
    @IsOptional()
    @ApiProperty({required: false })
    search? : string;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false })
    page?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false })
    size?: number;
}
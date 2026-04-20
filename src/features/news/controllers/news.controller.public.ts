import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NewsServicePublic } from '@/features/news/service/news.service.public';
import { NewsListPublicDto } from '@/features/news/dtos/news/public/news.list.public.dto';
import { NewsDetailPublicDto } from '@/features/news/dtos/news/public/news.detail.public.dto';
import { NewsFilters } from '@/features/news/filters/news.filters';

@Controller('public/news')
export class NewsControllerPublic {
    constructor(private readonly service: NewsServicePublic) {}

    @Get()
    @ApiOkResponse({ type: () => NewsListPublicDto, isArray: true })
    getAll(@Query() filters: NewsFilters) {
        return this.service.getAll(filters);
    }

    @Get(':id')
    @ApiOkResponse({ type: () => NewsDetailPublicDto })
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.getOne(id);
    }
}

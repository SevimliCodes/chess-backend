import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NewsServiceAdmin } from '@/features/news/service/news.service.admin';
import { NewsListAdminDto } from '@/features/news/dtos/news/admin/news.list.admin.dto';
import { NewsDetailAdminDto } from '@/features/news/dtos/news/admin/news.detail.admin.dto';
import { NewsCreateAdminDto } from '@/features/news/dtos/news/admin/news.create.admin.dto';
import { NewsUpdateAdminDto } from '@/features/news/dtos/news/admin/news.update.admin.dto';
import { NewsFilters } from '@/features/news/filters/news.filters';

@Controller('admin/news')
export class NewsControllerAdmin {
    constructor(private readonly service: NewsServiceAdmin) {}

    @Get()
    @ApiOkResponse({ type: () => NewsListAdminDto, isArray: true })
    getAll(@Query() filters: NewsFilters) {
        return this.service.getAll(filters);
    }

    @Get(':id')
    @ApiOkResponse({ type: () => NewsDetailAdminDto })
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.getOne(id);
    }

    @Post()
    @ApiOkResponse({ type: () => NewsDetailAdminDto })
    create(@Body() payload: NewsCreateAdminDto) {
        return this.service.create(payload);
    }

    @Put(':id')
    @ApiOkResponse({ type: () => NewsDetailAdminDto })
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: NewsUpdateAdminDto) {
        return this.service.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsRepository } from '@/features/news/repositories/news.repository';
import { NewsListPublicDto } from '@/features/news/dtos/news/public/news.list.public.dto';
import { NewsDetailPublicDto } from '@/features/news/dtos/news/public/news.detail.public.dto';
import { NewsFilters } from '@/features/news/filters/news.filters';

@Injectable()
export class NewsServicePublic {
    constructor(private readonly newsRepo: NewsRepository) {}

    async getAll(filters: NewsFilters): Promise<{ data: NewsListPublicDto[]; total: number }> {
        const page = filters.page || 1;
        const size = filters.size || 20;

        const [newsList, total] = await this.newsRepo.findPaginated(page, size, filters.search);

        const data = plainToInstance(NewsListPublicDto, newsList, {
            excludeExtraneousValues: true,
        });

        return { data, total };
    }

    async getOne(id: number): Promise<NewsDetailPublicDto> {
        const news = await this.newsRepo.findById(id);
        if (!news) throw new NotFoundException(`Yangilik #${id} topilmadi`);

        return plainToInstance(NewsDetailPublicDto, news, { excludeExtraneousValues: true });
    }
}
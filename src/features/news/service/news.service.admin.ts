import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsRepository } from '@/features/news/repositories/news.repository';
import { NewsCreateAdminDto } from '@/features/news/dtos/news/admin/news.create.admin.dto';
import { NewsUpdateAdminDto } from '@/features/news/dtos/news/admin/news.update.admin.dto';
import { NewsListAdminDto } from '@/features/news/dtos/news/admin/news.list.admin.dto';
import { NewsDetailAdminDto } from '@/features/news/dtos/news/admin/news.detail.admin.dto';
import { NewsFilters } from '@/features/news/filters/news.filters';

@Injectable()
export class NewsServiceAdmin {
    constructor(private readonly newsRepo: NewsRepository) {}

    async getAll(filters: NewsFilters): Promise<{ data: NewsListAdminDto[]; total: number }> {
        const page = filters.page || 1;
        const size = filters.size || 20;

        const [newsList, total] = await this.newsRepo.findPaginated(page, size, filters.search);

        const data = plainToInstance(NewsListAdminDto, newsList, {
            excludeExtraneousValues: true,
        });

        return { data, total };
    }

    async getOne(id: number): Promise<NewsDetailAdminDto> {
        const news = await this.newsRepo.findById(id);
        if (!news) throw new NotFoundException(`Yangilik #${id} topilmadi`);

        return plainToInstance(NewsDetailAdminDto, news, { excludeExtraneousValues: true });
    }

    async create(payload: NewsCreateAdminDto): Promise<NewsDetailAdminDto> {
        const news = await this.newsRepo.createAndSave(payload);
        return plainToInstance(NewsDetailAdminDto, news, { excludeExtraneousValues: true });
    }

    async update(id: number, payload: NewsUpdateAdminDto): Promise<NewsDetailAdminDto> {
        const news = await this.newsRepo.findById(id);
        if (!news) throw new NotFoundException(`Yangilik #${id} topilmadi`);

        const updated = await this.newsRepo.update(id, payload);
        return plainToInstance(NewsDetailAdminDto, updated, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<void> {
        const news = await this.newsRepo.findById(id);
        if (!news) throw new NotFoundException(`Yangilik #${id} topilmadi`);

        await this.newsRepo.delete(id);
    }
}

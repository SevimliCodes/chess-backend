import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { News } from '@/features/news/entities/news.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class NewsRepository extends BaseRepository<News> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(News, dataSource);
    }

    findLatest(limit: number = 10): Promise<News[]> {
        return this.repo.find({ order: { date: 'DESC' }, take: limit });
    }

    findPaginated(page: number, size: number, search?: string): Promise<[News[], number]> {
        const qb = this.repo
            .createQueryBuilder('n')
            .orderBy('n.date', 'DESC')
            .skip((page - 1) * size)
            .take(size);

        if (search) qb.where('n.title ILIKE :s', { s: `%${search}%` });

        return qb.getManyAndCount();
    }
}

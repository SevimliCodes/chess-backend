import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Author } from '@/features/authors/author.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class AuthorRepository extends BaseRepository<Author> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Author, dataSource);
    }

    findByFullName(fullName: string): Promise<Author | null> {
        return this.repo.findOne({ where: { fullName } });
    }

    searchByName(query: string): Promise<Author[]> {
        return this.repo
            .createQueryBuilder('a')
            .where('a.fullName ILIKE :q', { q: `%${query}%` })
            .getMany();
    }
}

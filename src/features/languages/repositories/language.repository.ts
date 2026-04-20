import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Language } from '@/features/languages/language.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class LanguageRepository extends BaseRepository<Language> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Language, dataSource);
    }

    findByCode(code: string): Promise<Language | null> {
        return this.repo.findOne({ where: { code } });
    }

    findByTitle(title: string): Promise<Language | null> {
        return this.repo.findOne({ where: { title } });
    }
}

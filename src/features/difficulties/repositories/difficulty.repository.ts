import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Difficulty } from '@/features/difficulties/difficulty.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class DifficultyRepository extends BaseRepository<Difficulty> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Difficulty, dataSource);
    }

    findByTitle(title: string): Promise<Difficulty | null> {
        return this.repo.findOne({ where: { title } });
    }
}

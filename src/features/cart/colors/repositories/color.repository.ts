import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Color } from '@/features/cart/colors/colors.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class ColorRepository extends BaseRepository<Color> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Color, dataSource);
    }

    findByTitle(title: string): Promise<Color | null> {
        return this.repo.findOne({ where: { title } });
    }

    findByColor(color: string): Promise<Color | null> {
        return this.repo.findOne({ where: { color } });
    }
}

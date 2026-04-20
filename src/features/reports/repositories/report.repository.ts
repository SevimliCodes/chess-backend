import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Report } from '@/features/reports/report.entity';
import { ReportType } from '@/core/enums';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class ReportRepository extends BaseRepository<Report> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Report, dataSource);
    }

    findByUser(userId: number): Promise<Report[]> {
        return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
    }

    findByType(type: ReportType): Promise<Report[]> {
        return this.repo.find({ where: { type }, order: { createdAt: 'DESC' } });
    }

    findUnreviewed(): Promise<Report[]> {
        return this.repo.find({ where: { isReviewed: false }, order: { createdAt: 'ASC' } });
    }

    findByTarget(targetId: number, type: ReportType): Promise<Report[]> {
        return this.repo.find({ where: { targetId, type } });
    }

    markReviewed(id: number): Promise<void> {
        return this.repo
            .createQueryBuilder()
            .update()
            .set({ isReviewed: true })
            .where('id = :id', { id })
            .execute()
            .then();
    }

    countUnreviewed(): Promise<number> {
        return this.repo.count({ where: { isReviewed: false } });
    }
}

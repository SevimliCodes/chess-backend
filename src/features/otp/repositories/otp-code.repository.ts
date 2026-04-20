import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { OtpCode } from '@/features/otp/otp.entity';
import { OtpType } from '@/core/enums';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class OtpCodeRepository extends BaseRepository<OtpCode> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(OtpCode, dataSource);
    }

    findActiveCode(userId: number, type: OtpType): Promise<OtpCode | null> {
        return this.repo.findOne({
            where: { userId, type, isUsed: false },
            order: { createdAt: 'DESC' },
        });
    }

    findByUserAndCode(userId: number, code: string, type: OtpType): Promise<OtpCode | null> {
        return this.repo.findOne({ where: { userId, code, type, isUsed: false } });
    }

    deleteByUser(userId: number): Promise<void> {
        return this.deleteBy({ userId });
    }
}

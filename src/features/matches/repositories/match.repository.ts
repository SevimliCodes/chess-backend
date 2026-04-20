import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Match } from '@/features/matches/match.entity';
import { MatchType, WinnerType } from '@/core/enums';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class MatchRepository extends BaseRepository<Match> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Match, dataSource);
    }

    findByUser(userId: number): Promise<Match[]> {
        return this.repo
            .createQueryBuilder('m')
            .leftJoinAndSelect('m.firstUser', 'firstUser')
            .leftJoinAndSelect('m.secondUser', 'secondUser')
            .where('m.firstUserId = :userId OR m.secondUserId = :userId', { userId })
            .orderBy('m.playedAt', 'DESC')
            .getMany();
    }

    findByType(type: MatchType): Promise<Match[]> {
        return this.repo.find({ where: { type }, order: { playedAt: 'DESC' } });
    }

    findWithRelations(id: number): Promise<Match | null> {
        return this.repo.findOne({
            where: { id },
            relations: ['firstUser', 'secondUser'],
        });
    }

    findByUsers(firstUserId: number, secondUserId: number): Promise<Match[]> {
        return this.repo
            .createQueryBuilder('m')
            .where(
                '(m.firstUserId = :firstUserId AND m.secondUserId = :secondUserId) OR (m.firstUserId = :secondUserId AND m.secondUserId = :firstUserId)',
                { firstUserId, secondUserId },
            )
            .orderBy('m.playedAt', 'DESC')
            .getMany();
    }

    countWinsByUser(userId: number, winner: WinnerType): Promise<number> {
        return this.repo
            .createQueryBuilder('m')
            .where(
                '(m.firstUserId = :userId AND m.winner = :winner) OR (m.secondUserId = :userId AND m.winner = :winner)',
                { userId, winner },
            )
            .getCount();
    }
}

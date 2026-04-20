import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '@/features/users/user.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(User, dataSource);
    }

    findByLogin(login: string): Promise<User | null> {
        return this.repo.findOne({ where: { login } });
    }

    findByIdWithRelations(id: number): Promise<User | null> {
        return this.repo.findOne({ where: { id } });
    }

    findActiveUsers(): Promise<User[]> {
        return this.repo.find({ where: { isActive: true } });
    }

    findByRefreshToken(refreshToken: string): Promise<User | null> {
        return this.repo.findOne({ where: { refreshToken } });
    }
}

import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from '@/features/courses/course.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class CourseRepository extends BaseRepository<Course> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Course, dataSource);
    }

    findPublished(): Promise<Course[]> {
        return this.repo.find({ where: { isPublished: true } });
    }

    findWithRelations(id: number): Promise<Course | null> {
        return this.repo.findOne({
            where: { id },
            relations: ['author', 'category', 'language', 'difficulty'],
        });
    }

    findByAuthor(authorId: number): Promise<Course[]> {
        return this.repo.find({ where: { authorId } });
    }

    findByCategory(categoryId: number): Promise<Course[]> {
        return this.repo.find({ where: { categoryId, isPublished: true } });
    }

    searchCourses(search: string, categoryId?: number, languageId?: number, difficultyId?: number) {
        const qb = this.repo
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.author', 'author')
            .leftJoinAndSelect('c.category', 'category')
            .leftJoinAndSelect('c.language', 'language')
            .leftJoinAndSelect('c.difficulty', 'difficulty')
            .where('c.isPublished = true');

        if (search) qb.andWhere('c.title ILIKE :s', { s: `%${search}%` });
        if (categoryId) qb.andWhere('c.categoryId = :categoryId', { categoryId });
        if (languageId) qb.andWhere('c.languageId = :languageId', { languageId });
        if (difficultyId) qb.andWhere('c.difficultyId = :difficultyId', { difficultyId });

        return qb.orderBy('c.createdAt', 'DESC').getManyAndCount();
    }

    incrementLikesCount(id: number): Promise<void> {
        return this.repo
            .createQueryBuilder()
            .update()
            .set({ likesCount: () => 'likes_count + 1' })
            .where('id = :id', { id })
            .execute()
            .then();
    }

    decrementLikesCount(id: number): Promise<void> {
        return this.repo
            .createQueryBuilder()
            .update()
            .set({ likesCount: () => 'likes_count - 1' })
            .where('id = :id', { id })
            .execute()
            .then();
    }

    updateRating(id: number, rating: number, reviewsCount: number): Promise<void> {
        return this.repo
            .createQueryBuilder()
            .update()
            .set({ rating, reviewsCount })
            .where('id = :id', { id })
            .execute()
            .then();
    }

    updateCounts(id: number, sectionsCount: number, lessonsCount: number): Promise<void> {
        return this.repo
            .createQueryBuilder()
            .update()
            .set({ sectionsCount, lessonsCount })
            .where('id = :id', { id })
            .execute()
            .then();
    }
}

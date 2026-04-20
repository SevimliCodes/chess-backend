import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Book } from '@/features/books/book.entity';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Book, dataSource);
    }

    findPublished(): Promise<Book[]> {
        return this.repo.find({ where: { isPublished: true } });
    }

    findWithRelations(id: number): Promise<Book | null> {
        return this.repo.findOne({
            where: { id },
            relations: ['author', 'category', 'language', 'difficulty'],
        });
    }

    findByCategory(categoryId: number): Promise<Book[]> {
        return this.repo.find({ where: { categoryId, isPublished: true } });
    }

    findByAuthor(authorId: number): Promise<Book[]> {
        return this.repo.find({ where: { authorId } });
    }

    searchBooks(search: string, categoryId?: number, languageId?: number, difficultyId?: number) {
        const qb = this.repo
            .createQueryBuilder('b')
            .leftJoinAndSelect('b.author', 'author')
            .leftJoinAndSelect('b.category', 'category')
            .leftJoinAndSelect('b.language', 'language')
            .leftJoinAndSelect('b.difficulty', 'difficulty')
            .where('b.isPublished = true');

        if (search) qb.andWhere('b.title ILIKE :s', { s: `%${search}%` });
        if (categoryId) qb.andWhere('b.categoryId = :categoryId', { categoryId });
        if (languageId) qb.andWhere('b.languageId = :languageId', { languageId });
        if (difficultyId) qb.andWhere('b.difficultyId = :difficultyId', { difficultyId });

        return qb.orderBy('b.createdAt', 'DESC').getManyAndCount();
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
}

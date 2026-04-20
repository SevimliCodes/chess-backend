import { DataSource, EntityTarget, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
    protected readonly repo: Repository<T>;

    constructor(entity: EntityTarget<T>, dataSource: DataSource) {
        this.repo = dataSource.getRepository(entity);
    }

    findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repo.find(options);
    }

    findOne(options: FindOneOptions<T>): Promise<T | null> {
        return this.repo.findOne(options);
    }

    findById(id: number): Promise<T | null> {
        return this.repo.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
    }

    findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
        return this.repo.findAndCount(options);
    }

    create(entity: Partial<T>): T {
        return this.repo.create(entity as T);
    }

    save(entity: T): Promise<T> {
        return this.repo.save(entity);
    }

    async createAndSave(entity: Partial<T>): Promise<T> {
        const created = this.repo.create(entity as T);
        return this.repo.save(created);
    }

    async update(id: number, entity: Partial<T>): Promise<T | null> {
        await this.repo.update(id, entity as any);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async deleteBy(where: FindOptionsWhere<T>): Promise<void> {
        await this.repo.delete(where);
    }

    exists(where: FindOptionsWhere<T>): Promise<boolean> {
        return this.repo.existsBy(where);
    }

    count(options?: FindManyOptions<T>): Promise<number> {
        return this.repo.count(options);
    }

    createQueryBuilder(alias: string) {
        return this.repo.createQueryBuilder(alias);
    }
}

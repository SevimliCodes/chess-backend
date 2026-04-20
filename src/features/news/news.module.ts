import { Module } from '@nestjs/common';
import { NewsControllerAdmin } from '@/features/news/controllers/news.controller.admin';
import { NewsControllerPublic } from '@/features/news/controllers/news.controller.public';
import { NewsServiceAdmin } from '@/features/news/service/news.service.admin';
import { NewsServicePublic } from '@/features/news/service/news.service.public';
import { NewsRepository } from '@/features/news/repositories/news.repository';

@Module({
    controllers: [NewsControllerAdmin, NewsControllerPublic],
    providers: [NewsServiceAdmin, NewsServicePublic, NewsRepository],
    exports: [NewsRepository],
})
export class NewsModule {}

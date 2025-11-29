import { ArticlesService } from './article.service';
import { ArticlesController } from './article.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    controllers: [
        ArticlesController,],
    providers: [
        ArticlesService,],
})
export class ArticleModule { }

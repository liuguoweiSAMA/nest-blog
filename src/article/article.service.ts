import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService,private config:ConfigService){}
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  async findAll(page=1) {
    console.log(page)
    // 获取config 环境变量的值
    const row = this.config.get('ARTICLE_PAGE_ROW')
    console.log(row)
    const article = await this.prisma.article.findMany({
      skip: (page-1)*row,
      take: +row
    })
    const total = await this.prisma.article.count()
    return {
      meta: {
        current_page:page,
        page_row: row,
        total,
        total_page: Math.ceil(total/row)
      },
      data: article
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}

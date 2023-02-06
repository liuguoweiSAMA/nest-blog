import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Category } from '../category/entities/category.entity'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, private config: ConfigService) {
    console.log(1)
  }
  async create(createArticleDto: CreateArticleDto) {
    const article = await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId,
      },
    })
    return article
  }

  async findAll(args: Record<string, any>) {
    // 获取config 环境变量的值
    const row = this.config.get('ARTICLE_PAGE_ROW')
    const page = args.page ? +args.page : 1
    const article = await this.prisma.article.findMany({
      skip: (page - 1) * row,
      take: +row,
      where: {
        category: args.category ? { id: +args.category } : {},
      },
      include: {
        category: true,
      },
    })
    const total = await this.prisma.article.count({
      where: {
        category: args.category ? { id: +args.category } : {},
      },
    })
    return {
      meta: {
        current_page: page,
        page_row: +row,
        total,
        total_page: Math.ceil(total / row),
      },
      data: article,
    }
  }

  findOne(id: number) {
    return this.prisma.article.findFirst({
      where: { id },
    })
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: { ...updateArticleDto, categoryId: updateArticleDto.categoryId },
    })
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    })
  }
}

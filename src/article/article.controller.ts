// import { Query } from '@nestjs/common'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  DefaultValuePipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { article } from '@prisma/client'
import { Article } from './entities/article.entity'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  findAll(@Query() args: Record<string, any>) {
    return this.articleService.findAll(args)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findOne(+id)
    return new Article(article)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}

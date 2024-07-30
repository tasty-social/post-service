import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { renderPagingResponse } from 'src/util/generatePaging'
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger'
import { QueryFilterDto } from 'src/common/dto/query-filter.dto'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBody({ type: CreatePostDto })
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    const authorId = req.user.userId
    return await this.postsService.create(createPostDto, authorId)
  }

  @Get()
  @ApiQuery({ type: QueryFilterDto })
  async getPosts(@Query() query: QueryFilterDto, @Req() req: any) {
    const [res, total] = await this.postsService.getPosts(req, query)
    const pagination = renderPagingResponse(query.limit, query.page, total)
    return { data: res, pagination }
  }
}

import { Body, Controller, Query, Req } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { renderPagingResponse } from 'src/util/generatePaging'
import { QueryFilter } from 'src/types/QueryFilter'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    const authorId = req.user.userId
    return await this.postsService.create(createPostDto, authorId)
  }

  async getPosts(@Query() query: QueryFilter, @Req() req: any) {
    const [res, total] = await this.postsService.getPosts(req, query)
    const pagination = renderPagingResponse(query.limit, query.page, total)

    return { data: res, pagination }
  }
}

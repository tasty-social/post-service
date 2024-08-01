import { Body, Controller, Get, Inject, Post, Query, Req } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { renderPagingResponse } from 'src/common/util/generatePaging'
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger'
import { QueryFilterDto } from 'src/common/dto/query-filter.dto'
import { Public } from 'src/common/decorator/public.decorator'
import { CommentEvent, CreatedEvent } from 'src/events'
import { ClientKafka, EventPattern } from '@nestjs/microservices'
import { isUUID } from 'class-validator'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    @Inject('KAFKA_SERVICE') protected readonly client: ClientKafka,
    private readonly postsService: PostsService
  ) {}

  @Post()
  @ApiBody({ type: CreatePostDto })
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    const authorId = req.user.userId
    return await this.postsService.create(createPostDto, authorId)
  }

  @Get()
  @Public()
  @ApiQuery({ type: QueryFilterDto })
  async getPosts(@Query() query: QueryFilterDto, @Req() req: any) {
    const [res, total] = await this.postsService.getPosts(req, query)
    const paging = renderPagingResponse(query.limit, query.page, total)
    return { data: res, paging }
  }

  async onModuleInit() {
    const events = [CommentEvent.created, CommentEvent.updated, CommentEvent.delete]
    events.forEach((event) => this.client.subscribeToResponseOf(event))
    await this.client.connect()
  }

  @EventPattern(CommentEvent.created)
  handleCommentCreated(data: any) {
    const event: CreatedEvent = data
    if (!isUUID(event._id)) {
      throw new Error('Validation failed (uuid is expected)')
    }

    this.postsService
  }
}

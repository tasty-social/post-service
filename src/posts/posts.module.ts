import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostSchema } from './schemas/post.schema'
import { registerKafkaAsyncOptions } from 'src/app.config'
import { ClientsModule } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.registerAsync(registerKafkaAsyncOptions()),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}

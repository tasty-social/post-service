import { Injectable } from '@nestjs/common'
import { Post, PostDocument } from './schemas/post.schema'
import { Model } from 'mongoose'
import { CreatePostDto } from './dto/create-post.dto'
import { QueryFilterDto } from 'src/common/dto/query-filter.dto'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto, authorId: string) {
    const createdPost = new this.postModel({
      ...createPostDto,
      authorId: authorId
    })

    return await createdPost.save()
  }

  async getPosts(req: any, query: QueryFilterDto) {
    const { page = 1, limit = 10 } = query
    const skip = (page - 1) * limit
    const regexQuery = { $regex: new RegExp(query.searchTxt, 'i') }
    let querySearch = {}
    if (query.searchTxt) {
      querySearch = {
        $or: [{ content: regexQuery }]
      }
    }

    const posts = await this.postModel.find(querySearch).skip(skip).limit(limit).exec()
    const total = await this.postModel.countDocuments().exec()

    return [posts, total]
  }

  async handleCommentCreated(postId: string) {
    this.postModel.findOneAndUpdate({ _id: postId }, { $inc: { totalComment: 1 } }).exec()
  }

  async handleCommentDeleted(postId: string) {
    this.postModel.findOneAndUpdate({ _id: postId }, { $inc: { totalComment: -1 } }).exec()
  }
}

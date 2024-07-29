import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
	constructor(
		@InjectModel(Post.name) private postModel: Model<PostDocument>
	) { }

	async create(createPostDto: CreatePostDto) {
		const createdPost = new this.postModel(createPostDto)
	}
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PostDocument = Post & Document

@Schema()
export class Post {
  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  authorId: string

  @Prop({ type: [String], default: [] })
  fileIds: string[]

  @Prop({ default: 0 })
  view: number

  @Prop({ default: 0 })
  vote: number

  @Prop({ default: 0 })
  totalComment: number

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)

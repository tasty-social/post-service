import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PostDocument = Post & Document;

@Schema()
export class Post {
	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
	authId: string;

	@Prop({ type: [String], default: [] })
	fileIds: string[];

	@Prop({ default: Date.now })
	createdAt: Date;

	@Prop({ default: Date.now })
	updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
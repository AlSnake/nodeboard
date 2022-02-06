import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces/Post';

const postSchema = new Schema<IPost>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		threadId: {
			type: String,
			required: true,
			trim: true,
		},
		userId: {
			type: String,
			required: true,
			trim: true,
		},
		message: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

export default model<IPost>('Post', postSchema);

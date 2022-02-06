import { Schema, model } from 'mongoose';
import { IThread } from '../interfaces/Thread';

const threadSchema = new Schema<IThread>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		subject: {
			type: String,
			required: true,
			trim: true,
		},
		forumId: {
			type: String,
			required: true,
			trim: true,
		},
		userId: {
			type: String,
			required: true,
			trim: true,
		},
		firstPostId: {
			type: String,
			required: false,
			trim: true,
		},
		postcount: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default model<IThread>('Thread', threadSchema);

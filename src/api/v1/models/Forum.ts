import { Schema, model } from 'mongoose';
import { IForum } from '../interfaces/Forum';

const forumSchema = new Schema<IForum>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		threadcount: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default model<IForum>('Forum', forumSchema);

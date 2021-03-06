import { Schema, model } from 'mongoose';
import { IUser, IUserExtra, UserFlags } from '../interfaces/User';

const userSchema = new Schema<IUser & IUserExtra>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		flags: {
			type: Number,
			enum: UserFlags,
			required: true,
		},
		email_verified: {
			type: Boolean,
			required: true,
			default: false,
		},
		email_verify_token: String,
		email_verify_expiry: Date,
	},
	{ timestamps: true }
);

export default model<IUser & IUserExtra>('User', userSchema);

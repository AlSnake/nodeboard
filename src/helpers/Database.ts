import mongoose, { CallbackWithoutResult } from 'mongoose';

export class Database {
	static connectMongodb(uri: string, cb: CallbackWithoutResult): void {
		mongoose.connect(uri, cb);
	}
}

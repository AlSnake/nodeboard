import Forum from '../models/Forum';
import { ThrowExtendedError } from '../helpers/error';
import { IForum } from '../interfaces/Forum';

export class ForumService {
	static async getForumById(id: string) {
		const findForum = await Forum.findOne({ id });
		if (!findForum) ThrowExtendedError('Forum not Found!', 404);
		return findForum;
	}

	static async getForums() {
		return await Forum.find({});
	}

	static async createForum(forum: IForum) {
		return await Forum.create(forum);
	}

	static async updateForum(id: string, forum: IForum) {
		const findForum = await this.getForumById(id);
		await findForum.updateOne(forum);
		return await this.getForumById(id);
	}

	static async deleteForum(id: string) {
		return await (await this.getForumById(id)).deleteOne();
	}
}

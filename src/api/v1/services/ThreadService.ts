import { ModelService } from './ModelService';
import { IThread } from '../interfaces/Thread';
import Thread from '../models/Thread';
import { ForumService } from './ForumService';
import { UserService } from './UserService';

export class ThreadService extends ModelService<IThread> {
	private forumService = new ForumService();
	private userService = new UserService();

	constructor() {
		super(Thread);
	}

	async create(thread: IThread) {
		await this.forumService.getById(thread.forumId);
		await this.userService.getById(thread.userId);
		return await super.create(thread);
	}

	async update(id: string, thread: IThread) {
		await this.forumService.getById(thread.forumId);
		await this.userService.getById(thread.userId);
		return await super.update(id, thread);
	}
}

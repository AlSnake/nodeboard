import { ModelService } from './ModelService';
import { IPost } from '../interfaces/Post';
import Post from '../models/Post';
import { UserService } from './UserService';
import { ThreadService } from './ThreadService';
import { ThrowExtendedError } from '../helpers/error';

export class PostService extends ModelService<IPost> {
	private userService = new UserService();
	private threadService = new ThreadService();

	constructor() {
		super(Post);
	}

	async create(post: IPost) {
		const thread = await this.threadService.getById(post.threadId);
		if (!thread.firstPostId || thread.firstPostId == null)
			await thread.updateOne({ firstPostId: post.id });
		await this.userService.getById(post.userId);
		return await super.create(post);
	}

	async getThreadPost(threadId: string, postId: string) {
		const thread = await this.threadService.getById(threadId);
		const post = await this.getById(postId);
		if (post.threadId !== thread.id)
			ThrowExtendedError('Post not Found!', 404);
		return post;
	}
}

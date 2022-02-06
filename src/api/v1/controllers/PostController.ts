import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/PostService';
import { ThreadService } from '../services/ThreadService';
import { generateSnowflake } from '../helpers/Snowflake';

export class PostController {
	private static postService = new PostService();
	private static threadService = new ThreadService();

	static async getPosts(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId } = req.params;
		await PostController.threadService.getById(threadId);

		const posts = await PostController.postService.getAllByProperty({
			threadId,
		});

		const response = posts.map((post) => {
			return {
				id: post.id,
				threadId: post.threadId,
				userId: post.userId,
				message: post.message,
			};
		});
		res.status(200).json(response);
	}

	static async postPosts(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId } = req.params;
		const { userId, message } = req.body;
		const id = generateSnowflake();

		const post = await PostController.postService.create({
			id,
			threadId,
			userId,
			message,
		});

		const response = {
			id: post.id,
			threadId: post.threadId,
			userId: post.userId,
			message: post.message,
		};
		res.status(201).json(response);
	}

	static async getPost(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId, postId } = req.params;
		const post = await PostController.postService.getThreadPost(
			threadId,
			postId
		);

		const response = {
			id: post.id,
			threadId: post.threadId,
			userId: post.userId,
			message: post.message,
		};
		res.status(200).json(response);
	}

	static async putPost(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId, postId } = req.params;
		const { userId, message } = req.body;

		const post = await PostController.postService.getThreadPost(
			threadId,
			postId
		);
		await PostController.postService.update(post.id, {
			id: postId,
			threadId,
			userId,
			message,
		});

		const response = {
			id: postId,
			threadId,
			userId,
			message,
		};
		res.status(200).json(response);
	}

	static async deletePost(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId, postId } = req.params;
		const post = await PostController.postService.getThreadPost(
			threadId,
			postId
		);
		await PostController.postService.delete(post.id);
		res.status(204).end();
	}
}

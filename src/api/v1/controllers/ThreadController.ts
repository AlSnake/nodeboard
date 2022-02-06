import { Request, Response, NextFunction } from 'express';
import { ThreadService } from '../services/ThreadService';
import { generateSnowflake } from '../helpers/Snowflake';

export class ThreadController {
	private static threadService: ThreadService = new ThreadService();

	static async getThreads(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const threads = await ThreadController.threadService.getAll();
		const response = threads.map((thread) => {
			return {
				id: thread.id,
				subject: thread.subject,
				forumId: thread.forumId,
				userId: thread.userId,
				firstPostId: thread.firstPostId,
				postcount: thread.postcount,
			};
		});
		res.status(200).json(response);
	}

	static async postThreads(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { subject, forumId, userId } = req.body;
		const id = generateSnowflake();

		const thread = await ThreadController.threadService.create({
			id,
			subject,
			forumId,
			userId,
			firstPostId: null,
			postcount: 0,
		});

		const response = {
			id: thread.id,
			subject: thread.subject,
			forumId: thread.forumId,
			userId: thread.userId,
			firstPostId: null,
			postcount: thread.postcount,
		};
		res.status(201).json(response);
	}

	static async getThread(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId } = req.params;
		const thread = await ThreadController.threadService.getById(threadId);
		const response = {
			id: thread.id,
			subject: thread.subject,
			forumId: thread.forumId,
			userId: thread.userId,
			firstPostId: thread.firstPostId,
			postcount: thread.postcount,
		};
		res.status(200).json(response);
	}

	static async putThread(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId } = req.params;
		const { subject, forumId, userId } = req.body;

		const thread = await ThreadController.threadService.update(threadId, {
			id: threadId,
			subject,
			forumId,
			userId,
		});

		const response = {
			id: threadId,
			subject,
			forumId,
			userId,
			firstPostId: thread.firstPostId,
			postcount: thread.postcount,
		};
		res.status(200).json(response);
	}

	static async deleteThread(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { threadId } = req.params;
		await ThreadController.threadService.delete(threadId);
		res.status(204).end();
	}
}

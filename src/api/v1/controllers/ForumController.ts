import { Request, Response, NextFunction } from 'express';
import { ForumService } from '../services/ForumService';
import { generateSnowflake } from '../helpers/Snowflake';

export class ForumController {
	static async getForums(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const forums = await ForumService.getForums();
		const response = forums.map((forum) => {
			return {
				id: forum.id,
				name: forum.name,
				description: forum.description,
				threadcount: forum.threadcount,
			};
		});
		res.status(200).json(response);
	}

	static async postForums(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { name, description } = req.body;
		const id = generateSnowflake();

		const forum = await ForumService.createForum({
			id,
			name,
			description,
			threadcount: 0,
		});

		const response = {
			id: forum.id,
			name: forum.name,
			description: forum.description,
			threadcount: forum.threadcount,
		};
		res.status(201).json(response);
	}

	static async getForum(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { forumId } = req.params;
		const forum = await ForumService.getForumById(forumId);
		const response = {
			id: forum.id,
			name: forum.name,
			description: forum.description,
			threadcount: forum.threadcount,
		};
		res.status(200).json(response);
	}

	static async putForum(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { forumId } = req.params;
		const { name, description } = req.body;

		const forum = await ForumService.updateForum(forumId, {
			id: forumId,
			name,
			description,
		});

		const response = {
			id: forum.id,
			name: forum.name,
			description: forum.description,
			threadcount: forum.threadcount,
		};
		res.status(200).json(response);
	}

	static async deleteForum(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { forumId } = req.params;
		await ForumService.deleteForum(forumId);
		res.status(204).end();
	}
}

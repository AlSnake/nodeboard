import { Request, Response, NextFunction } from 'express';
import { ForumService } from '../services/ForumService';
import { generateSnowflake } from '../helpers/Snowflake';

export class ForumController {
	private static forumService: ForumService = new ForumService();

	static async getForums(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const forums = await ForumController.forumService.getAll();
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

		const forum = await ForumController.forumService.create({
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
		const forum = await ForumController.forumService.getById(forumId);
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

		const forum = await ForumController.forumService.update(forumId, {
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
		await ForumController.forumService.delete(forumId);
		res.status(204).end();
	}
}

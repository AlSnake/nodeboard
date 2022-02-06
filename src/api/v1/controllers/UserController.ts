import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { generateSnowflake } from '../helpers/Snowflake';

export class UserController {
	private static userService: UserService = new UserService();

	static async getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const users = await UserController.userService.getAll();
		const response = users.map((user) => {
			return {
				id: user.id,
				email: user.email,
				username: user.username,
				password: user.password,
				flags: user.flags,
			};
		});
		res.status(200).json(response);
	}

	static async postUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { email, username, password, flags } = req.body;
		const id = generateSnowflake();

		const user = await UserController.userService.create({
			id,
			email,
			username,
			password,
			flags,
		});

		const response = {
			id: user.id,
			email: user.email,
			username: user.username,
			password: user.password,
			flags: user.flags,
		};
		res.status(201).json(response);
	}

	static async getMe(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userId = req.userId;
		const user = await UserController.userService.getById(userId);
		const response = {
			id: user.id,
			email: user.email,
			username: user.username,
			password: user.password,
			flags: user.flags,
		};
		res.status(200).json(response);
	}

	static async getUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { userId } = req.params;
		const user = await UserController.userService.getById(userId);
		const response = {
			id: user.id,
			email: user.email,
			username: user.username,
			password: user.password,
			flags: user.flags,
		};
		res.status(200).json(response);
	}

	static async putUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { userId } = req.params;
		const { email, username, password, flags } = req.body;

		const user = await UserController.userService.update(userId, {
			id: userId,
			email,
			username,
			password,
			flags,
		});

		const response = {
			id: user.id,
			email: user.email,
			username: user.username,
			password: user.password,
			flags: user.flags,
		};
		res.status(200).json(response);
	}

	static async deleteUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { userId } = req.params;
		await UserController.userService.delete(userId);
		res.status(204).end();
	}
}

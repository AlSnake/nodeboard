import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { generateSnowflake } from '../helpers/Snowflake';

export class UserController {
	static async getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const users = await UserService.getUsers();
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

		const user = await UserService.createUser({
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

	static async getUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { userId } = req.params;
		const user = await UserService.getUserById(userId);
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

		const user = await UserService.updateUser(userId, {
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
		await UserService.deleteUser(userId);
		res.status(204).end();
	}

	static async getMe(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userId = req.userId;
		res.status(200).end();
	}
}

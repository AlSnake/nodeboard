import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

export class AuthController {
	static async postLogin(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { email, password } = req.body;
		const jwt = await AuthService.login({ email, password });
		res.status(200).json({ token: jwt });
	}

	static async postVerifySend(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { email } = req.body;

		if (await UserService.isEmailVerified(email))
			return res
				.status(200)
				.json({ message: 'Email is Already Verified' });

		await AuthService.sendVerifyEmail(email);
		return res
			.status(200)
			.json({ message: 'Verification email has been sent!' });
	}

	static async postVerifyUser(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { email, token } = req.body;

		if (await UserService.isEmailVerified(email))
			return res
				.status(200)
				.json({ message: 'Email is Already Verified' });

		await AuthService.verifyEmail(email, token);
		res.status(200).json({ message: 'Email has been verified' });
	}
}

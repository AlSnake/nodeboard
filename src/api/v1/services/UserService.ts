import { ModelService } from './ModelService';
import { IUser } from '../interfaces/User';
import User from '../models/User';
import { ThrowExtendedError } from '../helpers/error';
import bcrypt from 'bcryptjs';

export class UserService extends ModelService<IUser> {
	constructor() {
		super(User);
	}

	async getUserByEmail(email: string) {
		const user = await User.findOne({ email: email });
		if (!user) ThrowExtendedError('User not found!', 404);
		return user;
	}

	async create(user: IUser) {
		const findUser = await User.findOne({
			$or: [{ email: user.email }, { username: user.username }],
		});
		if (findUser)
			ThrowExtendedError('Username or Email Already Exists', 422);

		user.password = await bcrypt.hash(user.password, 12);
		return await User.create({ ...user });
	}

	async update(id: string, user: IUser) {
		const findUser = await this.getById(id);

		const emailUsernameTaken = await User.findOne({
			id: { $ne: id },
			$or: [{ email: user.email }, { username: user.username }],
		});
		if (emailUsernameTaken)
			ThrowExtendedError('Username or Email Already Exists', 422);

		user.password = await bcrypt.hash(user.password, 12);
		await findUser.updateOne(user);
		return await this.getById(id);
	}

	async isEmailVerified(email: string) {
		return (await this.getUserByEmail(email)).email_verified;
	}
}

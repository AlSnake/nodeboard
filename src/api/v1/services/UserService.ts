import User from '../models/User';
import { ThrowExtendedError } from '../helpers/error';
import { User as IUser } from '../interfaces/User';
import bcrypt from 'bcryptjs';

export class UserService {
	static async getUsers() {
		return await User.find({});
	}

	static async getUserById(id: string) {
		const findUser = await User.findOne({ id });
		if (!findUser) ThrowExtendedError('User not found!', 404);
		return findUser;
	}

	static async getUserByEmail(email: string) {
		const user = await User.findOne({ email: email });
		if (!user) ThrowExtendedError('User not found!', 404);
		return user;
	}

	static async createUser(user: IUser) {
		const findUser = await User.findOne({
			$or: [{ email: user.email }, { username: user.username }],
		});
		if (findUser)
			ThrowExtendedError('Username or Email Already Exists', 422);

		user.password = await bcrypt.hash(user.password, 12);
		return await new User({ ...user }).save();
	}

	static async updateUser(id: string, user: IUser) {
		const findUser = await UserService.getUserById(id);

		const emailUsernameTaken = await User.findOne({
			id: { $ne: id },
			$or: [{ email: user.email }, { username: user.username }],
		});
		if (emailUsernameTaken)
			ThrowExtendedError('Username or Email Already Exists', 422);

		user.password = await bcrypt.hash(user.password, 12);
		await findUser.updateOne(user);
		return await this.getUserById(id);
	}

	static async deleteUser(id: string) {
		const findUser = await UserService.getUserById(id);
		return await findUser.deleteOne();
	}

	static async isEmailVerified(email: string) {
		return (await UserService.getUserByEmail(email)).email_verified;
	}
}

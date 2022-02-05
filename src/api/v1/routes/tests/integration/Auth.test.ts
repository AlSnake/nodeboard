import request from 'supertest';
import { Server } from '../../../../../Server';
import User from '../../../models/User';
import { Config } from '../../../../../config/Config';
import { generateRandomUser } from '../../../helpers/tests';
import bcrypt from 'bcryptjs';

const app = new Server();

describe('/v1/auth', () => {
	beforeAll(() => app.listen(Config.get('PORT') || '0'));
	afterAll(async () => {
		app.close();
		await User.deleteMany({});
	});

	describe('POST /login', () => {
		it('should return 422 if Input Validation Failed', async () => {
			const res = await request(app.server)
				.post('/api/v1/auth/login')
				.send({
					email: 'email@bad',
					password: 'pass',
				});
			expect(res.status).toBe(422);
		});

		it('should return 404 if User not found', async () => {
			const res = await request(app.server)
				.post('/api/v1/auth/login')
				.send({
					email: '444invalidUserre@nodeboard.ts',
					password: 'pass',
				});
			expect(res.status).toBe(404);
		});

		it('should return 401 if login credentials are invalid', async () => {
			const user = await User.create(generateRandomUser());
			const res = await request(app.server)
				.post('/api/v1/auth/login')
				.send({
					email: user.email,
					password: 'Pass1441INVALID',
				});
			expect(res.status).toBe(401);
		});

		it('should return JWT if Successfully LoggedIn', async () => {
			const user = generateRandomUser();
			const password = user.password;
			user.password = await bcrypt.hash(user.password, 12);
			await User.create(user);

			const res = await request(app.server)
				.post('/api/v1/auth/login')
				.send({
					email: user.email,
					password: password,
				});
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('token');
		});
	});
});

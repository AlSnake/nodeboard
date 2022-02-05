import request from 'supertest';
import { Server } from '../../../../../Server';
import User from '../../../models/User';
import { generateRandomUser } from '../../../helpers/tests';
import jwt from 'jsonwebtoken';
import { Config } from '../../../../../config/Config';

const app = new Server();

describe('/v1/users', () => {
	let jwtSecret = 'JWTTEST1234';

	beforeAll(() => app.listen(Config.get('PORT') || '0'));
	beforeEach(() => Config.set('JWT_SECRET', jwtSecret));
	afterAll(async () => {
		app.close();
		await User.deleteMany({});
	});

	describe('GET /', () => {
		it('should return all Users', async () => {
			await User.insertMany([generateRandomUser(), generateRandomUser()]);
			const res = await request(app.server).get('/api/v1/users');
			expect(res.status).toBe(200);
			expect(res.body).not.toBeNull();
			expect(res.body).not.toEqual([]);
		});
	});

	describe('POST /', () => {
		it('should return 422 if Input Validation Failed', async () => {
			const res = await request(app.server).post('/api/v1/users').send({
				email: 'email@bad',
				username: 'm',
				password: 'pas',
				flags: -15,
			});
			expect(res.status).toBe(422);
		});

		it('should return 422 if Username or Email already exists', async () => {
			const user = await User.create(generateRandomUser());
			const res = await request(app.server).post('/api/v1/users').send({
				email: user.email,
				username: user.username,
				password: user.password,
				flags: user.flags,
			});
			expect(res.status).toBe(422);
		});

		it('should save User if Input Validation Succeed', async () => {
			const user = generateRandomUser();
			await request(app.server).post('/api/v1/users').send(user);

			const finduser = await User.findOne({
				email: user.email,
				username: user.username,
			});
			expect(finduser).not.toBeNull();
		});

		it('should return User if Successfully Created', async () => {
			const user = generateRandomUser();
			const res = await request(app.server)
				.post('/api/v1/users')
				.send(user);
			expect(res.status).toBe(201);
			expect(res.body).toHaveProperty('id');
			expect(res.body).toHaveProperty('email', user.email);
			expect(res.body).toHaveProperty('username', user.username);
		});
	});

	describe('GET /me', () => {
		it('should return 401 if Not Authenticated', async () => {
			const res = await request(app.server).get('/api/v1/users/me');
			expect(res.status).toBe(401);
		});

		it('should return current User if Authenticated', async () => {
			const user = generateRandomUser();
			await User.create(user);

			const token = jwt.sign({ userId: user.id }, jwtSecret, {
				expiresIn: '2m',
			});

			const res = await request(app.server)
				.get('/api/v1/users/me')
				.set('authorization', `Bearer ${token}`);
			expect(res.status).toBe(200);
			expect(res.body).toMatchObject(user);
			expect(res.body).toHaveProperty('username', user.username);
		});
	});

	describe('GET /:userId', () => {
		it('should return 422 if userId is invalid format', async () => {
			const res = await request(app.server).get(
				'/api/v1/users/hello12345world'
			);
			expect(res.status).toBe(422);
		});

		it('should return 404 if userId is invalid', async () => {
			const res = await request(app.server).get('/api/v1/users/5123');
			expect(res.status).toBe(404);
		});

		it('should return User if userId is valid', async () => {
			const user = generateRandomUser();
			await User.create(user);
			const res = await request(app.server).get(
				'/api/v1/users/' + user.id
			);
			expect(res.status).toBe(200);
			expect(res.body).toMatchObject(user);
			expect(res.body).toHaveProperty('username', user.username);
		});
	});

	describe('PUT /:userId', () => {
		it('should return 422 if userId is invalid format', async () => {
			const res = await request(app.server)
				.put('/api/v1/users/hello12345world')
				.send({});
			expect(res.status).toBe(422);
		});

		it('should return 422 if Input Validation Failed', async () => {
			const user = await User.create(generateRandomUser());
			const res = await request(app.server)
				.put('/api/v1/users/' + user.id)
				.send({
					email: 'email@bad',
					username: 'm',
					password: 'pas',
					flags: -15,
				});
			expect(res.status).toBe(422);
		});

		it('should return 404 if userId is invalid', async () => {
			const res = await request(app.server)
				.put('/api/v1/users/5123')
				.send(generateRandomUser());
			expect(res.status).toBe(404);
		});

		it('should return 422 if Username or Email already exists', async () => {
			const existingUser = await User.create(generateRandomUser());
			const user = await User.create(generateRandomUser());

			const res = await request(app.server)
				.put('/api/v1/users/' + user.id)
				.send({
					email: existingUser.email,
					username: existingUser.username,
					password: user.password,
					flags: user.flags,
				});
			expect(res.status).toBe(422);
		});

		it('should update User if Input Validation Succeed', async () => {
			const user = await User.create(generateRandomUser());
			await request(app.server)
				.put('/api/v1/users/' + user.id)
				.send({
					email: user.email,
					username: user.username + 'updated',
					password: user.password,
					flags: user.flags,
				});

			const finduser = await User.findOne({
				email: user.email,
				username: user.username + 'updated',
			});
			expect(finduser).not.toBeNull();
		});

		it('should return User if Successfully Updated', async () => {
			const user = await User.create(generateRandomUser());
			const res = await request(app.server)
				.put('/api/v1/users/' + user.id)
				.send({
					email: user.email,
					username: user.username + 'updated',
					password: user.password,
					flags: user.flags,
				});
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('id');
			expect(res.body).toHaveProperty('email', user.email);
			expect(res.body).toHaveProperty(
				'username',
				user.username + 'updated'
			);
		});
	});

	describe('DELETE /:userId', () => {
		it('should return 422 if userId is invalid format', async () => {
			const res = await request(app.server).delete(
				'/api/v1/users/hello12345world'
			);
			expect(res.status).toBe(422);
		});

		it('should return 404 if userId is invalid', async () => {
			const res = await request(app.server).get('/api/v1/users/5123');
			expect(res.status).toBe(404);
		});

		it('should delete User if userId is valid', async () => {
			const user = await User.create(generateRandomUser());
			await request(app.server).delete('/api/v1/users/' + user.id);

			const finduser = await User.findOne({
				email: user.email,
				username: user.password,
			});
			expect(finduser).toBeNull();
		});

		it('should return 204 if Successfully Deleted', async () => {
			const user = await User.create(generateRandomUser());
			const res = await request(app.server).delete(
				'/api/v1/users/' + user.id
			);
			expect(res.status).toBe(204);
		});
	});
});

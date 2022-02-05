import request from 'supertest';
import { Server } from '../../../../../Server';
import { Config } from '../../../../../config/Config';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import { generateRandomUser } from '../../../helpers/tests';

const app = new Server();

describe('isAuthenticated middleware', () => {
	let jwtSecret = 'JWTTEST1234';

	beforeAll(() => app.listen(Config.get('PORT') || '0'));
	beforeEach(() => Config.set('JWT_SECRET', jwtSecret));
	afterAll(async () => {
		app.close();
		await User.deleteMany({});
	});

	it('should return 500 if JWT SECRET is NOT PROVIDED', async () => {
		Config.unset('JWT_SECRET');
		const res = await request(app.server)
			.get('/api/v1/users/me')
			.set('authorization', '1234');
		expect(res.status).toBe(500);
	});

	it('should return 401 if JWT Token is NOT PROVIDED', async () => {
		const res = await request(app.server).get('/api/v1/users/me');
		expect(res.status).toBe(401);
	});

	it('should return 400 if JWT Token is Invalid', async () => {
		const res = await request(app.server)
			.get('/api/v1/users/me')
			.set('authorization', '12333');
		expect(res.status).toBe(400);
	});

	it('should return 200 if JWT Token is Valid', async () => {
		const user = await User.create(generateRandomUser());

		const token = jwt.sign({ userId: user.id }, jwtSecret, {
			expiresIn: '2m',
		});

		const res = await request(app.server)
			.get('/api/v1/users/me')
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
	});
});

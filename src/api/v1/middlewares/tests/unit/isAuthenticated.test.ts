import { isAuthenticated } from '../../isAuthenticated';
import { Config } from '../../../../../config/Config';
import jwt from 'jsonwebtoken';
import { generateSnowflake } from '../../../helpers/Snowflake';

describe('isAuthenticated middleware', () => {
	it('should set userId', () => {
		let userId = generateSnowflake();
		const jwtSecret = 'JWTTEST1234';
		Config.set('JWT_SECRET', jwtSecret);

		const token = jwt.sign({ userId: userId }, jwtSecret, {
			expiresIn: '2m',
		});

		const req = {
			headers: {
				authorization: `Bearer ${token}`,
			},
			userId: null,
		};
		const res = {};
		const next = jest.fn();
		// @ts-ignore
		isAuthenticated(req, res, next);

		expect(req.userId).toBe(userId);
	});
});

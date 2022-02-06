import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from './handler';

export function validatePost(): RequestHandler[] {
	return [
		body('userId', 'UserID must be a valid Snowflake ID')
			.exists()
			.isString()
			.matches(/^[0-9]+$/),
		body('message', 'message must be between 0-65535 Characters')
			.exists()
			.trim()
			.isLength({ min: 0, max: 65535 }),
		validationHandler,
	];
}

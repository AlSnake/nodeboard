import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from './handler';

export function validateThread(): RequestHandler[] {
	return [
		body(
			'subject',
			'subject must be between 2-32 Characters, and can only contain Letters, and Numbers'
		)
			.exists()
			.trim()
			.isAlphanumeric()
			.isLength({ min: 2, max: 32 }),
		body('forumId', 'ForumID must be a valid Snowflake ID')
			.exists()
			.isString()
			.matches(/^[0-9]+$/),
		body('userId', 'UserID must be a valid Snowflake ID')
			.exists()
			.isString()
			.matches(/^[0-9]+$/),
		validationHandler,
	];
}

import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from './handler';

export function validateForum(): RequestHandler[] {
	return [
		body(
			'name',
			'name must be between 2-32 Characters, and can only contain Letters, and Numbers'
		)
			.exists()
			.trim()
			.isAlphanumeric()
			.isLength({ min: 2, max: 32 }),
		body('description', 'description must be between 2-50 Characters')
			.exists()
			.trim()
			.isLength({ min: 2, max: 50 }),
		validationHandler,
	];
}

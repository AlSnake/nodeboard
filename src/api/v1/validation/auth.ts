import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from './handler';

export function validateLogin(): RequestHandler[] {
	return [
		body('email', 'Bad Email Address')
			.exists()
			.trim()
			.isLength({ max: 64 })
			.isEmail()
			.normalizeEmail(),
		body('password', 'Bad Password').exists().trim(),
		validationHandler,
	];
}

export function validateVerifyUser(): RequestHandler[] {
	return [
		body('email', 'Bad Email Address')
			.exists()
			.trim()
			.isLength({ max: 64 })
			.isEmail()
			.normalizeEmail(),
		body('token', 'Bad Verification Token').exists().trim(),
		validationHandler,
	];
}

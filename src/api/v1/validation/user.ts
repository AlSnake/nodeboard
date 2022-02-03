import { body, param } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from './handler';
import { UserFlags } from '../interfaces/User';

export function validateUser(): RequestHandler[] {
	return [
		body('email', 'Bad Email Address')
			.exists()
			.trim()
			.isLength({ max: 64 })
			.isEmail()
			.normalizeEmail(),
		body(
			'username',
			'Username must be between 2-32 Characters, and can only contain Letters, and Numbers'
		)
			.exists()
			.trim()
			.isAlphanumeric()
			.isLength({ min: 2, max: 32 }),
		body(
			'password',
			'Password must be at least 8 characters, and must contain at least one Uppercase letter, one Special character, and one Number'
		)
			.exists()
			.trim()
			.isStrongPassword({
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			}),
		body('flags', 'Invalid Flags')
			.exists()
			.isInt()
			.custom((value, { req }) => {
				return req.body.flags in UserFlags;
			}),
		validationHandler,
	];
}

export function validateUserIdParam(): RequestHandler[] {
	return [
		param('userId')
			.exists()
			.isString()
			.matches(/^[0-9]+$/),
		validationHandler,
	];
}

export function validateEmail(): RequestHandler[] {
	return [
		body('email', 'Bad Email Address')
			.exists()
			.trim()
			.isLength({ max: 64 })
			.isEmail()
			.normalizeEmail(),
		validationHandler,
	];
}

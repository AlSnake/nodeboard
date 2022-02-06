import { param } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from './handler';

export function validateSnowflakeParam(name: string): RequestHandler[] {
	return [
		param(name)
			.exists()
			.isString()
			.matches(/^[0-9]+$/),
		validationHandler,
	];
}

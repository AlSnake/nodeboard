import { param } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from './handler';

export function validateSnowflakeParam(name: string): RequestHandler[] {
	return [
		param(name, 'ID must be a valid Snowflake ID')
			.exists()
			.isString()
			.matches(/^[0-9]+$/),
		validationHandler,
	];
}

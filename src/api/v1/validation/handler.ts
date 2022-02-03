import { validationResult } from 'express-validator';
import { ThrowExtendedError } from '../helpers/error';
import { Request, Response, NextFunction } from 'express';

export function validationHandler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		ThrowExtendedError('Input Validation Failed', 422, errors.array());

	next();
}

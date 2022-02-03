import { Request, Response, NextFunction } from 'express';
import { ThrowExtendedError } from '../helpers/error';
import jwt from 'jsonwebtoken';
import { Config } from '../../../config/Config';

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const jwtSecret = Config.get('JWT_SECRET');
	if (!jwtSecret) ThrowExtendedError('Internal Error JWT', 500);

	const authHeader = req.headers.authorization;
	if (!authHeader) ThrowExtendedError('Not Authenticated', 401);

	const token = authHeader.split(' ')[1];
	const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
	req.userId = decoded.userId;
	next();
}

// LOADERS
import startupLoader from './loaders/loader';
startupLoader();

import 'dotenv/config';
import { Config } from './config/Config';
import { Logger } from './core/logger';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { Database } from './helpers/Database';
import { MONGODB_URI } from './config/mongodb';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import RouterV1 from './api/v1/routes/Router';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// SWAGGER
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(YAML.load('./src/api/swagger/swagger.yaml'))
);

// RATE LIMITER
const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 100, // 100 requests per minute
	standardHeaders: true,
	legacyHeaders: false,
	message: 'HTTP 429 TOO MANY REQUESTS',
});
app.use(rateLimiter);

// Router
app.use('/api', RouterV1.getRouter());

// INTERNAL ERROR HANDLER
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	const error = { message: err.message, errors: err.errors };

	if (app.get('env') === 'development')
		Object.assign(error, {
			stack: err.stack,
			debug: err,
		});

	return res.status(status).json(error);
});

Database.connectMongodb(MONGODB_URI, (err) => {
	if (err) {
		Logger.error('MONGODB:', err);
		process.exit(1);
	}

	app.listen(Config.get('PORT'), () => {
		Logger.info('Successfully connected to MongoDB');
		Logger.info('Listening on Port: %d', Config.get('PORT'));
	});
});

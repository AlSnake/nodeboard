import 'dotenv/config';
import { startup } from './loaders/loader';
import { Logger } from './core/logger';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import http from 'http';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import rateLimit from 'express-rate-limit';
import RouterV1 from './api/v1/routes/Router';
import { Database } from './helpers/Database';

export class Server {
	private app: express.Application = express();
	private _server!: http.Server;

	constructor() {
		this.initLoader();
		this.initMiddlewares();
		this.setupSwagger();
		this.rateLimiter();
		this.initRouter();
		this.initErrorHandler();
		this.initDatabase();
	}

	listen = (port: string | number, cb?: () => void): void => {
		this._server = this.app.listen(port, cb);
	};

	close = (): void => {
		if (this._server) this._server.close();
	};

	get server(): http.Server {
		return this._server;
	}

	private initLoader() {
		if (!process.env.NODE_ENV) throw new Error('BAD NODE_ENV');
		startup(process.env.NODE_ENV);
	}

	private initMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}

	private setupSwagger() {
		this.app.use(
			'/api-docs',
			swaggerUi.serve,
			swaggerUi.setup(YAML.load('./src/api/swagger/swagger.yaml'))
		);
	}

	private rateLimiter() {
		this.app.use(
			rateLimit({
				windowMs: 1 * 60 * 1000,
				max: 100, // 100 requests per minute
				standardHeaders: true,
				legacyHeaders: false,
				message: 'HTTP 429 TOO MANY REQUESTS',
			})
		);
	}

	private initRouter() {
		this.app.use('/api', RouterV1.getRouter());
	}

	private initErrorHandler() {
		this.app.use(
			(err: any, req: Request, res: Response, next: NextFunction) => {
				const status = err.status || 500;
				const error = { message: err.message, errors: err.errors };

				if (this.app.get('env') === 'dev')
					Object.assign(error, {
						stack: err.stack,
						debug: err,
					});

				return res.status(status).json(error);
			}
		);
	}

	private async initDatabase() {
		const { MONGODB_URI } = await import(`./config/mongodb`);
		Database.connectMongodb(MONGODB_URI, (err) => {
			if (err) {
				Logger.error('MONGODB:', err);
				process.exit(1);
			}
			Logger.info('Successfully connected to MongoDB');
		});
	}
}

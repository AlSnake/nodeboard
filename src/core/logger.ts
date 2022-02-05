import winston from 'winston';
import { Config } from '../config/Config';
import appRoot from 'app-root-path';

const logdir = appRoot.path + '/logs';

const Levels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 4,
};

const level = () => {
	const env = Config.get('NODE_ENV') || 'dev';
	return env == 'dev' ? 'debug' : 'warn';
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	debug: 'white',
};

const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	winston.format.colorize({ all: true }),
	winston.format.splat(),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`
	)
);

const transports = [
	new winston.transports.Console({
		level: 'info',
	}),
	new winston.transports.File({
		filename: logdir + '/error.log',
		level: 'error',
	}),
	new winston.transports.File({
		filename: logdir + '/debug.log',
		level: 'debug',
	}),
	new winston.transports.File({ filename: logdir + '/logs.log' }),
];

const exceptionHandlers = [
	new winston.transports.Console(),
	new winston.transports.File({
		filename: logdir + '/exceptions.log',
		level: 'error',
	}),
];

winston.addColors(colors);

export const Logger = winston.createLogger({
	levels: Levels,
	level: level(),
	format,
	transports,
	exceptionHandlers,
});

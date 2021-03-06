import 'dotenv/config';
import { Config } from '../config/Config';
import testconf from '../config/conf/config.test.json';
import devconf from '../config/conf/config.dev.json';

function setConfig(key: string, value: any) {
	if (!value) throw new Error(key + ' NOT SET');
	Config.set(key, value);
}

export function loadProdConfig(): void {
	// APP
	setConfig('NODE_ENV', process.env.NODE_ENV);
	setConfig('PORT', process.env.PORT);
	setConfig('JWT_SECRET', process.env.JWT_SECRET);

	// MONGODB
	setConfig('MONGODB_HOST', process.env.MONGODB_HOST);
	setConfig('MONGODB_USER', process.env.MONGODB_USER);
	setConfig('MONGODB_PASS', process.env.MONGODB_PASS);
	setConfig('MONGODB_DATABASE', process.env.MONGODB_DATABASE);

	// SMTP
	setConfig('SMTP_HOST', process.env.SMTP_HOST);
	setConfig('SMTP_PORT', process.env.SMTP_PORT);
	setConfig('SMTP_USER', process.env.SMTP_USER);
	setConfig('SMTP_PASS', process.env.SMTP_PASS);

	// EMAIL
	setConfig('NOREPLY_EMAIL', process.env.NOREPLY_EMAIL);
}

export function loadEnvConfig(env: string) {
	if (env === 'test') Config.reloadFromObject(testconf);
	else if (env === 'dev') Config.reloadFromObject(devconf);
	else loadProdConfig();
}

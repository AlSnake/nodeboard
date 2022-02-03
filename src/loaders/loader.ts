import { loadEnvConfig } from './config';
import { Logger } from '../core/logger';

export function startup(env: string | undefined) {
	if (!env) throw new Error('BAD NODE_ENV');
	Logger.info(`LOADING ${env} ENVIRONMENT`);
	loadEnvConfig(env);
}

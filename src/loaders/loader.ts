import { loadEnvConfig } from './config';
import { Logger } from '../core/logger';

export function startup(env: string) {
	Logger.info(`LOADING ${env} ENVIRONMENT`);
	loadEnvConfig(env);
}

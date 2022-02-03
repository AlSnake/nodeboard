import { Config } from './Config';

export const MONGODB_URI = `mongodb+srv://${Config.get(
	'MONGODB_USER'
)}:${Config.get('MONGODB_PASS')}@${Config.get('MONGODB_HOST')}/${Config.get(
	'MONGODB_DATABASE'
)}`;

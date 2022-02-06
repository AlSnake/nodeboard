import { Snowflake } from './types/Snowflake';

export interface IForum {
	id: Snowflake;
	name: string;
	description: string;
	threadcount?: number;
}

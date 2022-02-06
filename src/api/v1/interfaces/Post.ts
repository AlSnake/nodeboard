import { Snowflake } from './types/Snowflake';

export interface IPost {
	id: Snowflake;
	threadId: Snowflake;
	userId: Snowflake;
	message: string;
}

import { Snowflake } from './types/Snowflake';

export interface IThread {
	id: Snowflake;
	subject: string;
	forumId: Snowflake;
	userId: Snowflake;
	firstPostId?: Snowflake | null;
	postcount?: number;
}

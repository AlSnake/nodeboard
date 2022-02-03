import { Snowflake } from './types/Snowflake';

export interface User {
	id: Snowflake;
	email: string;
	username: string;
	password: string;
	flags: UserFlags;
	email_verified?: boolean;
}

export interface UserExtra {
	email_verify_token?: string;
	email_verify_expiry?: Date | number;
}

export enum UserFlags {
	NONE = 0,
	USER = 1 << 0,
	STAFF = 1 << 1,
}

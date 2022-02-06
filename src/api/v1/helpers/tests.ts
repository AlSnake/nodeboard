import { IUser } from '../interfaces/User';
import { generateSnowflake } from './Snowflake';
import { faker } from '@faker-js/faker';
import { IForum } from '../interfaces/Forum';

export function generateRandomUser(): IUser {
	let name = (faker.name.firstName() + faker.datatype.number()).toLowerCase();
	return {
		id: generateSnowflake(),
		email: `${name}@nodeboard.test`,
		username: name,
		password: 'Test1234$',
		flags: 0,
	};
}

export function generateRandomForum(): IForum {
	return {
		id: generateSnowflake(),
		name: faker.name.firstName().toLowerCase(),
		description: faker.name.lastName().toLowerCase(),
		threadcount: faker.datatype.number(),
	};
}

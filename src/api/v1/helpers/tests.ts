import { User } from '../interfaces/User';
import { generateSnowflake } from './Snowflake';
import { faker } from '@faker-js/faker';

export function generateRandomUser(): User {
	let name = (faker.name.firstName() + faker.datatype.number()).toLowerCase();
	return {
		id: generateSnowflake(),
		email: `${name}@nodeboard.test`,
		username: name,
		password: 'Test1234$',
		flags: 0,
	};
}

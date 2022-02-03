import { generateSnowflake } from '../../Snowflake';

describe('Generate Snowflake', () => {
	it('should return a string containing only numbers', () => {
		const result = generateSnowflake();
		expect(typeof result).toBe('string');
		expect(result).toMatch(/^[0-9]+$/);
	});
});

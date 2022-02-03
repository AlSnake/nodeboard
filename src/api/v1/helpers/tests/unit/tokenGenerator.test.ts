import tokenGenerator from '../../tokenGenerator';

describe('Token Generator', () => {
	let size = 32;
	let len = size * 2;
	it(`should return a ${len}-character string`, async () => {
		const result = await tokenGenerator(size);
		expect(result).toHaveLength(len);
	});
});

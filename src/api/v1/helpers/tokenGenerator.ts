import crypto from 'crypto';
import { ThrowExtendedError } from './error';

export default function (size: number): Promise<string> {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(size, async (err, buffer) => {
			if (err) ThrowExtendedError('Failed to Generate Token', 500);
			resolve(buffer.toString('hex'));
		});
	});
}

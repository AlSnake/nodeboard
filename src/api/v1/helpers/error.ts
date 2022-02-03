import { ExtendedError } from '../interfaces/ExtendedError';

export function ThrowExtendedError(
	message?: string | undefined,
	status?: number,
	errors?: any
): never {
	const error: ExtendedError = new Error(message);
	error.status = status;
	error.errors = errors;
	throw error;
}

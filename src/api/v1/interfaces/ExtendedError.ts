export interface ExtendedError extends Error {
	status?: number;
	errors?: any;
}

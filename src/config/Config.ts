export class Config {
	private static settings: Map<string, string> = new Map();

	static set(key: string, value: string): void {
		this.settings.set(key, value);
	}

	static get(key: string) {
		return this.settings.get(key);
	}
}

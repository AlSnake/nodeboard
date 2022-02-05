export class Config {
	private static settings: Map<string, string> = new Map();

	static set(key: string, value: string): void {
		this.settings.set(key, value);
	}

	static unset(key: string): void {
		this.settings.delete(key);
	}

	static get(key: string) {
		return this.settings.get(key);
	}

	static reloadFromObject(obj: object) {
		this.settings = new Map(Object.entries(obj));
	}
}

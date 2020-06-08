export class Logger {
	constructor() {
		// Do nothing
	}

	public info(log: string): void {
		console.log(new Date() + "info::::" + log);
	}

	public debug(log: string): void {
		console.log(new Date() + "debug::::" + log);
	}

	public error(log: string): void {
		console.log(new Date() + "error::::" + log);
	}
}

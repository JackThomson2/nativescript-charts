export class Common {
	public message: string;

	constructor() {
		this.message = Utils.SUCCESS_MSG();
	}
}

export class Utils {
	public static SUCCESS_MSG(): string {
		let msg = `Your plugin is working on .`;

		return msg;
	}
}

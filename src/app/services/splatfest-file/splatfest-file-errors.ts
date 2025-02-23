export class NotASplatfestFileError extends Error {
	constructor() {
		super('Not a Splatfest file');
		this.name = 'NotASplatfestFileError';
	}
}
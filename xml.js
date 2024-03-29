export const xml = (...args) => new DOMParser()
	.parseFromString(String.raw.apply(null, args).trim(), 'application/xml');

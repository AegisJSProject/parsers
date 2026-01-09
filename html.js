import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';
import { stringify } from './utils.js';

const raw = (strings, values, mapper = stringify) => String.raw(strings, ...values.map(mapper)).trim();

export function createHTMLParser(config = sanitizer, { mapper = stringify } = {}) {
	return (strings, ...values) => {
		const tmp = document.createElement('template');
		tmp.setHTML(raw(strings, values, mapper), { sanitizer:  config });

		return tmp.content;
	};
}

export const html = createHTMLParser(sanitizer, { mapper: stringify });

export function htmlUnsafe(strings, ...values) {
	const tmp = document.createElement('template');
	tmp.setHTMLUnsafe(raw(strings, values));

	return tmp.content;
}

export const el = (...args) => html.apply(null, args).firstElementChild;

export function doc(strings, ...values) {
	return Document.parseHTML(raw(strings, values), { sanitizer });
}

export function docUnsafe(strings, ...values) {
	return Document.parseHTMLUnsafe(raw(strings, values));
}

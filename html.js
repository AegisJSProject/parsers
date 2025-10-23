import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';
import { stringify } from './utils.js';

export function createHTMLParser(config = sanitizer, { mapper = stringify } = {}) {
	return (strings, ...values) => {
		const frag = document.createDocumentFragment();
		const tmp = document.createElement('div');
		tmp.setHTML(String.raw(strings, ...values.map(mapper)).trim(), { sanitizer:  config });
		frag.append(...tmp.childNodes);
		return frag;
	};
}

export const html = createHTMLParser(sanitizer, { mapper: stringify });

export function htmlUnsafe(strings, ...values) {
	const frag = document.createDocumentFragment();
	const tmp = document.createElement('div');
	tmp.setHTMLUnsafe(String.raw(strings, ...values.map(stringify)).trim());
	frag.append(...tmp.childNodes);
	return frag;
}

export const el = (...args) => html.apply(null, args).firstElementChild;

export function doc(strings, ...values) {
	return Document.parseHTML(String.raw(strings, ...values.map(stringify)), { sanitizer });
}

export function docUnsafe(strings, ...values) {
	return Document.parseHTMLUnsafe(String.raw(strings, ...values.map(stringify)));
}

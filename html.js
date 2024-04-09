import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';
import { stringify } from './utils.js';

export function createHTMLParser(config = sanitizer, { mapper = stringify } = {}) {
	return (strings, ...values) => {
		const frag = document.createDocumentFragment();
		frag.setHTML(String.raw(strings, ...values.map(mapper)).trim(), config);
		return frag;
	};
}

export const html = createHTMLParser(sanitizer, { mapper: stringify });

export const el = (...args) => html.apply(null, args).firstElementChild;

export function doc(strings, ...values) {
	return Document.parseHTML(String.raw(strings, ...values.map(stringify)), sanitizer);
}

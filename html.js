import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';
import { stringify } from './utils.js';

export const createHTMLParser = (config = sanitizer) => (strings, ...values) => {
	const el = document.createElement('div');
	const frag = document.createDocumentFragment();
	el.setHTML(String.raw(strings, ...values.map(stringify)).trim(), { sanitizer: config });
	frag.append(...el.childNodes);
	return frag;
};

export const html = createHTMLParser(sanitizer);

export const el = (...args) => html.apply(null, args).firstElementChild;

export function doc(strings, ...values) {
	return Document.parseHTML(
		String.raw(strings, ...values.map(stringify)),
		{ sanitizer }
	);
}

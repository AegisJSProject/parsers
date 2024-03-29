import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';

function stringify(thing) {
	switch(typeof thing) {
		case 'string':
			return thing;

		case 'object':
			if (thing instanceof DocumentFragment) {
				return Array.from(
					thing.childNodes,
					node => node.nodeType === Node.ELEMENT_NODE
						? node.outerHTML
						: node.textContent
				);
			} else if (thing instanceof Element) {
				return thing.outerHTML;
			} else {
				return thing.toString();
			}

		default:
			return thing.toString();
	}
}

export const createHTMLParser = (config = sanitizer) => (strings, ...values) => {
	const el = document.createElement('div');
	const frag = document.createDocumentFragment();
	el.setHTML(String.raw(strings, ...values.map(stringify)).trim(), { sanitizer: config });
	frag.append(...el.childNodes);
	return frag;
};

export const html = createHTMLParser(sanitizer);

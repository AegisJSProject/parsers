import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';

export function createPolicy(name = 'aegis-parsers#html', {
	elements = sanitizer.elements,
	attributes = sanitizer.attributes,
	comments = sanitizer.comments,
} = sanitizer) {
	const createHTML = (input) => {
		const el = document.createElement('div');
		el.setHTML(input, { sanitizer: { elements, attributes, comments }});
		return el.innerHTML;
	};

	if ('trustedTypes' in globalThis) {
		return globalThis.trustedTypes.createPolicy(name, { createHTML });
	} else {
		return Object.freeze({ createHTML });
	}
}

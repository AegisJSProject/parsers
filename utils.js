const stringifyChildren = thing => Array.from(
	thing[Symbol.iterator](),
	node => node.nodeType === Node.ELEMENT_NODE
		? node.outerHTML
		: node.textContent
).join('');

export function stringify(thing) {
	switch(typeof thing) {
		case 'string':
			return thing;

		case 'function':
			throw new TypeError('Functions are not allowed.');

		case 'object':
			if (thing === null) {
				return '';
			} else if (thing instanceof DocumentFragment || thing instanceof Document) {
				return stringifyChildren(thing.childNodes);
			} else if (thing instanceof NodeList || thing instanceof HTMLCollection) {
				return stringifyChildren(thing);
			} else if (thing instanceof Element) {
				return thing.outerHTML;
			} else if (Array.isArray(thing)) {
				return thing.map(stringify).join('');
			} else {
				return thing.toString();
			}

		default:
			return thing.toString();
	}
}

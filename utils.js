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
			throw new TypeError('Functions are not supported.');

		case 'undefined':
			return '';

		case 'object':
			if (thing === null) {
				return '';
			} else if (thing instanceof DocumentFragment || thing instanceof Document) {
				return stringifyChildren(thing.childNodes);
			} else if (thing instanceof NodeList || thing instanceof HTMLCollection) {
				return stringifyChildren(thing);
			} else if (thing instanceof Element) {
				return thing.outerHTML;
			} else if (thing instanceof Date) {
				return thing.toISOString();
			} else if (Array.isArray(thing)) {
				return thing.map(stringify).join('');
			} else if (thing instanceof ArrayBuffer && Uint8Array.prototype.toBase64 instanceof Function) {
				return new Uint8Array(thing).toBase64();
			} else if (ArrayBuffer.isView(thing) && thing.toBase64 instanceof Function) {
				return thing.toBase64();
			} else {
				return thing.toString();
			}

		default:
			return thing.toString();
	}
}

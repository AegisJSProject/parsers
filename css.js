const stringify = thing => {
	switch(typeof thing) {
		case 'undefined':
			return '';

		case 'boolean':
			return thing ? 'true' : 'false';

		case 'object':
			if (thing === null) {
				return '';
			} else if (thing instanceof CSSStyleSheet) {
				return [...thing.cssRules].map(rule => rule.cssText).join('\n\n');
			} else if (thing instanceof CSSRule) {
				return thing.cssText;
			} else if (thing instanceof HTMLLinkElement) {
				return stringify(thing.sheet);
			} else if (thing instanceof ArrayBuffer && Uint8Array.prototype.toBase64 instanceof Function) {
				return new Uint8Array(thing).toBase64();
			} else if (ArrayBuffer.isView(thing) && thing.toBase64 instanceof Function) {
				return thing.toBase64();
			} else if (thing instanceof Blob) {
				return URL.createObjectURL(thing);
			} else {
				return thing.toString();
			}

		default:
			return thing.toString();
	}
};

export function createStyleSheet(cssRules, { media, disabled, baseURL } = {}) {
	console.log(cssRules);
	const sheet = new CSSStyleSheet({
		media: media instanceof MediaQueryList ? media.media : media,
		disabled,
		baseURL
	});

	sheet.replace(cssRules).catch(console.error);
	return sheet;
}

export const createCSSParser = ({ media, disabled, baseURL } = {}) => (strings, ...args) => {
	return createStyleSheet(String.raw(strings, ...args.map(stringify)).trim(), { media, disabled, baseURL });
};

export const css = createCSSParser();

export function styleSheetToLink(sheet, { crossOrigin = 'anonymous', referrerPolicy = 'no-referrer' } = {}) {
	const link = document.createElement('link');
	const file = new File(Array.from(sheet.cssRules, rule => rule.cssText), 'sheet.css', { type: sheet.type });

	link.rel = 'stylesheet';
	link.crossOrigin = crossOrigin;
	link.referrerPolicy = referrerPolicy;
	link.disabled = sheet.disabled;

	if (sheet.media.length !== 0) {
		link.media = sheet.media.mediaText;
	}

	link.href = URL.createObjectURL(file);
	return link;
}

export function setStyleSheets(node, ...styles) {
	if (node instanceof HTMLDocument || node instanceof ShadowRoot) {
		node.adoptedStyleSheets = styles;
	} else {
		throw new TypeError('Node must be a `HTMLDocument` or `ShadowRoot`.');
	}
}

export function addStyleSheets(node, ...styles) {
	if (node instanceof Document || node instanceof ShadowRoot) {
		node.adoptedStyleSheets = [...node.adoptedStyleSheets, ...styles];
	} else {
		throw new TypeError('Node must be a `HTMLDocument` or `ShadowRoot`.');
	}
}

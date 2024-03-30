export function createStyleSheet(cssRules, { media, disabled, baseURL } = {}) {
	const sheet = new CSSStyleSheet({
		media: media instanceof MediaQueryList ? media.media : media,
		disabled,
		baseURL
	});

	sheet.replaceSync(cssRules);
	return sheet;
}

export const createCSSParser = ({ media, disabled, baseURL } = {}) => (...args) => {
	return createStyleSheet(String.raw.apply(null, args).trim(), { media, disabled, baseURL });
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

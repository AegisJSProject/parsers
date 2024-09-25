import { stringify } from './utils.js';

export function escape(str) {
	return encodeURIComponent(stringify(str).trim()).replaceAll('.', '%2E');
}

export function url(strings, base, ...values) {
	if (base instanceof Blob && strings.length === 2 && strings[0] === '' && strings[1] === '') {
		return URL.createObjectURL(base);
	} else if (URL.canParse(base)) {
		return URL.parse(String.raw(strings, '', ...values.map(escape)), base);
	} else {
		return URL.parse(String.raw(strings, escape(base), ...values.map(escape)));
	}
}

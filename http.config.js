import { useDefaultCSP, addScriptSrc, addImageSrc, addTrustedTypePolicy, lockCSP } from '@aegisjsproject/http-utils/csp.js';

addScriptSrc('https://unpkg.com/@shgysk8zer0/', 'https://unpkg.com/@aegisjsproject/');
addImageSrc('blob:');
addTrustedTypePolicy('aegis-router#html', 'aegis-sanitizer#html', 'default');
lockCSP();

export default {
	open: true,
	routes: {
		'/': '@aegisjsproject/dev-server',
		'/favicon.svg': '@aegisjsproject/dev-server/favicon.js'
	},
	responsePostprocessors: [useDefaultCSP()],
};

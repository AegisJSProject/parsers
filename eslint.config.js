import js from '@eslint/js';
import globals from 'globals';

export default [
	// 'files': ['*.js', '**/*.js'],
	{
		'ignores': [
			'/node_modules/*',
			'/_site/*',
			'/img/*',
			'/css/*',
			'/fonts/*',
			'/js/std-js/*',
			'**/*.cjs',
			'./*.cjs',
			'./harden.cjs',
			'**/*.mjs',
			'./*.mjs',
			'**/*.min.js',
			'*.min.js',
		],
	}, {
		'rules': {
			...js.configs.recommended.rules,
			'indent': [2, 'tab', { 'SwitchCase': 1 }],
			'quotes': [2, 'single'],
			'semi': [2, 'always'],
			'no-console': 0,
			'no-async-promise-executor': 0,
			'no-prototype-builtins': 0,
			'no-unused-vars': 'error',
		},
		'languageOptions': {
			'ecmaVersion': 'latest',
			'sourceType': 'module',
			'globals': {
				'globalThis': 'readonly',
				'trustedTypes': 'readonly',
				// ...Object.fromEntries(Object.keys(globals.browser).map(key => [key, 'readonly'])),
				...globals.browser,
			}
		}
	}
];

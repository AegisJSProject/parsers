import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [{
	input: 'parsers.js',
	external: [
		'@aegisjsproject/sanitizer/config/html.js',
		'@aegisjsproject/sanitizer/config/svg.js',
		'@aegisjsproject/sanitizer/config/mathml.js',
		'@aegisjsproject/sanitizer/config/base.js',
	],
	output: {
		file: 'parsers.cjs',
		format: 'cjs',
	},
}, {
	input: 'bundle.js',
	plugins: [nodeResolve()],
	output: {
		file: 'bundle.min.js',
		format: 'module',
		plugins: [terser()],
		sourcemap: true,
	}
}];

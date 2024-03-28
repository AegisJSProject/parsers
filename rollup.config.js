import { nodeResolve } from '@rollup/plugin-node-resolve';
import { warningHandler } from '@shgysk8zer0/js-utils/rollup';
import { listDirByExt } from '@shgysk8zer0/npm-utils/fs';

const modules = await listDirByExt('./', '.js');

export default {
	input: modules.filter(module => ! module.endsWith('.config.js')),
	external: [],
	onwarn: warningHandler,
	output: {
		dir: './cjs/',
		format: 'cjs',
		preserveModules: true,
		entryFileNames: '[name].cjs',
		chunkFileNames: '[name]-[hash].cjs',
	},
	plugins: [nodeResolve()],
};

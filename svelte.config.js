import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	vite: {
		optimizeDeps: {
			include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
		}
	},
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;

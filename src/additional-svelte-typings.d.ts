declare namespace svelteHTML {
	// enhance attributes
	interface HTMLAttributes<T> {
		// If you want to use on:beforeinstallprompt
		'on:outclick'?: (event: any) => any;
		// If you want to use myCustomAttribute={..} (note: all lowercase)
		pos?: number;
		'dot-num'?: number;
	}
}

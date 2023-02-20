export interface Link {
	/**
	 * The label or name of the link (e.g. about, facebook, etc.)
	 */
	name: string;
	/**
	 * The destination URI/URL (e.g. https://scuzzyfox.com)
	 */
	href: string;
}

export interface LinkCF {
	/**
	 * The label or name of the link (e.g. about, facebook, etc.)
	 */
	name: string;
	/**
	 * The destination URI/URL (e.g. https://scuzzyfox.com)
	 */
	href: string;
	/**
	 * A boolean describing the destination as NSFW
	 */
	nsfw: boolean;
	/**
	 * A boolean describing the destination as babyfur
	 */
	abdl: boolean;
}

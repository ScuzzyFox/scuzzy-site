import type { Link } from '$lib/Link';

export interface Goal {
	id: number;
	name: string;
	description: string;
	cost: number;
	image: Link;
	fulfilled: boolean;
	dateAdded: Date;
	dateFulfilled?: Date;
	useCase?: string;
}

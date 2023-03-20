import type { Link } from '$lib/Link';

export interface Goal {
	id?: number;
	name: string;
	description: string;
	cost: number;
	image?: string | any;
	fulfilled?: boolean;
	created?: Date;
	dateFulfilled?: Date;
	useCase?: string;
	imageAlt: string;
	slug?: string;
}

export function snakeToCamel(input: any): Goal | any {
	let goal: Goal | any = input;

	goal['useCase'] = goal['use_case'];
	goal['dateFulfilled'] = goal['date_fulfilled'];
	goal['imageAlt'] = goal['image_alt'];
	goal['image'] = goal['image_url'];
	goal['cost'] = Number(goal['cost']);

	delete goal['use_case'];
	delete goal['date_fulfilled'];
	delete goal['image_alt'];
	delete goal['image_url'];

	goal['dateFulfilled'] = goal['dateFulfilled'] ? new Date(goal['dateFulfilled']) : null;
	goal['created'] = goal['created'] ? new Date(goal['created']) : null;

	return goal;
}

export function camelToSnake(input: Goal): any {
	let goal: Goal | any = input;

	goal['use_case'] = goal['useCase'];
	goal['date_fulfilled'] = goal['dateFulfilled'];
	goal['image_alt'] = goal['imageAlt'];
	goal['image_url'] = goal['image'];

	delete goal['useCase'];
	delete goal['dateFulfilled'];
	delete goal['imageAlt'];
	delete goal['image'];

	return goal;
}

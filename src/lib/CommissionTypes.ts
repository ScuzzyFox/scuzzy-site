export interface Option {
	id?: number;
	name: string;
	description: string;
	cost: number;
	adult: boolean;
	abdl: boolean;
	exclusive_with?: string;
	required?: string;
	example_image_url?: string;
}

export interface CharacterReference {
	id?: number;
	character_name: string;
	text_description?: string;
	order?: number;
	link?: string;
	image?: any;
	image_url?: string;
	adult: boolean;
	abdl: boolean;
	type?: string;
}

export interface CommissionOrder {
	id?: number;
	commission: number;
	subtotal: number;
	customer_name: string;
	where_to_contact: 'TG' | 'DC' | 'TW' | 'FA';
	contact_info: string;
	email: string;
	abdl: boolean;
	adult: boolean;
	created?: Date;
	modified?: Date;
	artist_note?: string | null | undefined;
	extra_character_details?: string | null | undefined;
	commission_description: string;
	number_of_characters: number;
	customer_sketch?: string | null | undefined;
	completed: boolean;
	commissionData?: any;
	statuses?: CommissionStatus[];
	character_references?: CharacterReference[];
	selected_options: Option[];
}

export interface CommissionStatus {
	id: number;
	status: string;
	color: string;
}

export interface CommissionCategory {
	id?: number;
	name: string;
	adult: boolean;
	abdl: boolean;
}

export interface CommissionVisual {
	id?: number;
	adult: boolean;
	abdl: boolean;
	visual_url?: string;
	visual?: string;
	is_video: boolean;
	group_identifier: string;
	order: number;
	commission: number;
}

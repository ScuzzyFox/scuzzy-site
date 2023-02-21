import type { Goal } from '$lib/Goal';

let NAS: Goal = {
	id: 0,
	name: 'Storage NAS',
	description: 'A NAS for storing stuff at home!',
	cost: 400.0,
	image: {
		href: 'https://i.ebayimg.com/images/g/GMQAAOSwT6lj6O6z/s-l1600.jpg',
		name: 'NAS image'
	},
	fulfilled: true,
	dateAdded: new Date(Date.parse('Mon Feb 20 2023 13:32:33 GMT-0700 (Mountain Standard Time)')),
	useCase:
		"Since I have multiple devices at home, I'll be using this NAS to keep data synced between them so I can stay organized when working on projects!",
	dateFulfilled: new Date('Mon Feb 20 2023 13:33:33 GMT-0700 (Mountain Standard Time)')
};

let serverCabinet: Goal = {
	id: 1,
	name: 'Server Cabinet',
	description: 'A server cabinet to store server and network stuff!',
	cost: 160.0,
	image: {
		href: 'https://nbp-file.bytopo.com/Image/Ebay/221116/I22111600802/VPPicture_e0149783-0323-4bc1-9303-662ab5deed34.jpg',
		name: 'Cabinet image'
	},
	fulfilled: true,
	dateAdded: new Date(Date.parse('Mon Feb 20 2023 13:41:33 GMT-0700 (Mountain Standard Time)')),
	useCase:
		"My current cabinet is just a shelf in my garage and is prone to a lot of dust, so I'd like to enclose it to keep my equipment from dying",
	dateFulfilled: new Date('Mon Feb 20 2023 13:42:33 GMT-0700 (Mountain Standard Time)')
};

let dongle: Goal = {
	id: 2,
	name: 'USB Dongle',
	description: "A Dongle to adapt SD cards and USB sticks as I don't have one",
	cost: 60.0,
	image: {
		href: 'https://i.ebayimg.com/images/g/uyMAAOSwt0RjaLg-/s-l1600.jpg',
		name: 'Dongle image'
	},
	fulfilled: false,
	dateAdded: new Date(Date.parse('Mon Feb 20 2023 13:55:33 GMT-0700 (Mountain Standard Time)')),
	useCase: 'Dongle use case'
};

let keyboard: Goal = {
	id: 3,
	name: 'Mechanical Keyboard',
	description:
		"My current keyboard is big, squeaky and sucks to type on. I'm aiming to get a ducky keyboard to fix this!",
	cost: 200.0,
	image: {
		href: 'https://i.ebayimg.com/images/g/wd0AAOSwSXVj8uLw/s-l1600.jpg',
		name: 'Keyboard image'
	},
	fulfilled: false,
	dateAdded: new Date(Date.parse('Mon Feb 20 2023 13:58:33 GMT-0700 (Mountain Standard Time)'))
};

let ps5: Goal = {
	id: 4,
	name: 'PlayStation 5',
	description: 'Been wanting a PS5 for a while as I still need to play TLOU and Horizon games!',
	cost: 599,
	image: {
		href: 'https://i.ebayimg.com/images/g/3G8AAOSwNslhoSZW/s-l1600.jpg',
		name: 'PS5 Image'
	},
	dateAdded: new Date('Mon Feb 20 2023 14:00:00 GMT-0700 (Mountain Standard Time)'),
	fulfilled: false
};

let allGoals: Goal[] = [NAS, serverCabinet, ps5, keyboard, dongle];

/* function compare(a: Goal, b: Goal) {
	let aDate = a.dateAdded;
	let bDate = b.dateAdded;

	if (aDate < bDate) {
		return 1;
	}
	if (aDate > bDate) {
		return -1;
	}
	return 0;
}

allGoals = allGoals.sort(compare); */

export function GET() {
	return new Response(JSON.stringify(allGoals));
}

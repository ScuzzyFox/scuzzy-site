import type { Link } from '../../lib/Link';

export const load = () => {
	let currentGoal = getCurrentGoal();
	let previousGoals = getPreviousGoals(3);
	let paypalBalance = getPaypalBalance();

	return {
		currentGoal,
		previousGoals,
		paypalBalance
	};
};

function getCurrentGoal() {
	return {
		id: 7,
		name: 'fursuit',
		description:
			"I've always wanted a fursuit, and I don't think i'll be making one so I wanna buy from a maker!",
		cost: 4750.69,
		image: {
			name: 'link to fursuit image',
			href: 'https://i.etsystatic.com/15652127/r/il/c8cfb4/4635997669/il_1588xN.4635997669_fme5.jpg'
		},
		fulfilled: false,
		dateAdded: Date()
	};
}

function getPreviousGoals(limit: number) {
	let previousGoals = [
		{
			id: 7,
			name: 'fursuit',
			description:
				"I've always wanted a fursuit, and I don't think i'll be making one so I wanna buy from a maker!",
			cost: 450.69,
			image: {
				name: 'link to fursuit image',
				href: 'https://i.etsystatic.com/15652127/r/il/c8cfb4/4635997669/il_1588xN.4635997669_fme5.jpg'
			},
			fulfilled: false,
			dateAdded: Date()
		},
		{
			id: 2,
			name: 'laptop',
			description: 'A laptop for me to do coding and art on the move!',
			cost: 2000.0,
			image: {
				name: 'link to laptop image',
				href: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWBrzy?ver=85d4&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true'
			},
			fulfilled: true,
			dateAdded: 'Tue Jan 31 2023 20:48:52 GMT-0700 (Mountain Standard Time)'
		},
		{
			id: 4,
			name: 'car',
			description: 'I need a new car!',
			cost: 40070.99,
			image: {
				name: 'link image of car',
				href: 'https://media.wired.co.uk/photos/60f5a2fda98458eddde4f163/16:9/w_2560%2Cc_limit/2021-WIRED-Car1.jpg'
			},
			fulfilled: true,
			dateAdded: 'Wed Feb 01 2023 20:48:52 GMT-0700 (Mountain Standard Time)'
		}
	];

	previousGoals = previousGoals.filter((goal) => {
		return goal.fulfilled;
	});

	function compare(a: any, b: any) {
		let aDate = Date.parse(a.dateAdded);
		let bDate = Date.parse(b.dateAdded);

		if (aDate < bDate) {
			return 1;
		}
		if (aDate > bDate) {
			return -1;
		}
		return 0;
	}
	previousGoals = previousGoals.sort(compare);

	return previousGoals.slice(0, limit);
}

function getPaypalBalance() {
	return (Math.random() * 700 + 300).toFixed(2);
}

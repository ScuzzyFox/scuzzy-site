import type { Goal } from '$lib/Goal';
import type { Link } from '../../lib/Link';
import { PAYPAL_USER, PAYPAL_PASSWORD, PAYPAL_SIGNATURE } from '$env/static/private';

export const load = async (event: any) => {
	let allGoals = await getAllGoals(event);

	let currentGoal = getCurrentGoal(allGoals);
	let previousGoals = getPreviousGoals(allGoals, 2);
	let nextGoal = getNextGoal(allGoals);
	let paypalBalance = await getPaypalBalance(event);

	return {
		currentGoal,
		previousGoals,
		nextGoal,
		allGoals,
		paypalBalance
	};
};

async function getAllGoals(event: any) {
	const response = await event.fetch('/test/goals', {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});

	return await response.json();
}

//the current goal should be the first unfulfilled goal when sorted by date added
function getCurrentGoal(goals: Goal[]) {
	goals = goals.sort(compareGoals);
	let unfulfilledGoals = goals.filter((goal: Goal) => {
		return !goal.fulfilled;
	});
	return unfulfilledGoals[0];
}

function getPreviousGoals(goals: Goal[], limit: number) {
	//filter for only fulfilled goals
	let previousGoals = goals.filter((goal) => {
		return goal.fulfilled;
	});

	//sort the filtered goals by date added
	previousGoals = previousGoals.sort(compareGoals);

	return previousGoals.slice(0, limit);
}

async function getPaypalBalance(event: any) {
	let apiUrl = 'https://api-3t.paypal.com/nvp';

	let nvp =
		'METHOD=GetBalance&' +
		PAYPAL_USER +
		'&' +
		PAYPAL_PASSWORD +
		'&' +
		PAYPAL_SIGNATURE +
		'&RETURNALLCURRENCIES=0&VERSION=109.0';

	let response = await fetch(apiUrl, {
		method: 'POST',
		body: nvp,
		headers: {
			'Content-Type': 'text/html'
		}
	});
	let decodedResponse: string = decodeURIComponent(await response.text());

	//extract KEY=value to a dictionary
	let result: any = extractNvp(decodedResponse);

	//check if ACK exists, if it doesn't, check if L_ERRORCODE0 exists, if it does Then get L_SHORTMESSAGE0 and throw error. If none of them exist then throw a general error code
	if (result.ACK) {
		//console.log(JSON.stringify(result));
		if (result.L_ERRORCODE0) {
			throw { name: 'PaypalResponseError', message: result.L_SHORTMESSAGE0 };
		}
	} else {
		throw {
			name: 'PaypalResponseError',
			message: 'Neither ACK or L_ERRORCODE0 present in response: ' + JSON.stringify(result)
		};
	}

	//get L_AMT0 value
	let ppBal: number = parseFloat(result.L_AMT0);
	//return L_AMT0 value

	return ppBal;
}

//the next goal is the one after the current goal
function getNextGoal(goals: Goal[]) {
	let sortedGoals = goals.sort(compareGoals);

	let currentGoalID = getCurrentGoal(sortedGoals).id;

	let currentGoalIndex: number = sortedGoals.findIndex((goal) => {
		return goal.id === currentGoalID;
	});

	//returns the goal after the current goal
	return sortedGoals[currentGoalIndex + 1];
}

function compareGoals(a: Goal, b: Goal) {
	let aDate: Date = a.dateAdded;
	let bDate: Date = b.dateAdded;

	if (aDate > bDate) {
		return 1;
	}
	if (aDate < bDate) {
		return -1;
	}
	return 0;
}

function extractNvp(data: string) {
	const regex = /([A-Za-z0-9_]+)=([^&]+)/g;

	let match;
	const result: any = {};
	while ((match = regex.exec(data)) !== null) {
		result[match[1]] = match[2];
	}

	return result;
}

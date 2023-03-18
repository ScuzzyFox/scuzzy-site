import type { Goal } from '$lib/Goal';
import type { Link } from '../../lib/Link';
import { PAYPAL_USER, PAYPAL_PASSWORD, PAYPAL_SIGNATURE } from '$env/static/private';
import { snakeToCamel } from '$lib/Goal';

export const load = async (event: any) => {
	let allGoals: Goal[] = await getAllGoals();

	let currentGoal: Goal | undefined = getCurrentGoal(allGoals);
	let previousGoals: Goal[] | undefined = getPreviousGoals(allGoals, 2);
	let nextGoal: Goal | undefined= getNextGoal(allGoals, currentGoal ? currentGoal.id : undefined);
	let paypalBalance = await getPaypalBalance(event);

	return {
		currentGoal,
		previousGoals,
		nextGoal,
		allGoals,
		paypalBalance
	};
};

async function getAllGoals(): Promise<Goal[]> {
	const response = await fetch('https://api.scuzzyfox.com/goals/', {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});

	let input = await response.json();

	let goals: Goal[] = input.map((snakeGoal: any) => {
		return snakeToCamel(snakeGoal);
	});

	return goals;
}

//the current goal should be the first unfulfilled goal when sorted by date added
function getCurrentGoal(goals: Goal[]): Goal | undefined {
	if (goals.length < 1) {
		return undefined;
	} 
	goals = goals.sort(compareGoals);
	let unfulfilledGoals = goals.filter((goal: Goal) => {
		return !goal.fulfilled;
	});
	if (!unfulfilledGoals || goals.length < 1) {
		return undefined;
	}

	return unfulfilledGoals[0];
}

function getPreviousGoals(goals: Goal[], limit: number):Goal[] | undefined {
	if (goals.length < 1) {
		return undefined;
	} 

	//filter for only fulfilled goals
	let previousGoals = goals.filter((goal) => {
		return goal.fulfilled;
	});

	if (previousGoals.length < 2) {
		return undefined;
	} 

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
function getNextGoal(goals: Goal[], currentGoalID: number | undefined): Goal |undefined {

	if(!currentGoalID){
		return undefined
	}

	if(goals.length<1){
		return undefined
	}


	let sortedGoals = goals.sort(compareGoals);

	

	let currentGoalIndex: number = sortedGoals.findIndex((goal) => {
		return goal.id === currentGoalID;
	});

	if(currentGoalIndex<0){
		return undefined
	}
	let result;

	try{
		result = sortedGoals[currentGoalIndex + 1];
		return result
	} catch(e){
		return undefined
	}

	
}

function compareGoals(a: Goal, b: Goal) {
	let aDate: Date | any = a.created;
	let bDate: Date | any = b.created;

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

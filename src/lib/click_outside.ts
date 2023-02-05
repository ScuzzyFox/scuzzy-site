import type { Action } from "@sveltejs/kit";
export function clickOutside(node:HTMLElement) {
	const handleClick = (event: { target: any; }) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent<Action>("outclick"));
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		}
	};
}
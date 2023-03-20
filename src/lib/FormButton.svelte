<script lang="ts">
	export let buttonDisabled: boolean;
	export let label: string;
</script>

<button disabled={buttonDisabled}>{label}</button>

<style>
	button {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
		font-family: var(--main-font);
		font-weight: 900;
		font-size: 1.1rem;
		border: none;
		border-radius: var(--radius-btn);
		padding: 0.5rem 1rem;
		align-self: flex-end;
		box-shadow: var(--btn-drp-shdw);
		margin-top: 1rem;
		transition: var(--transition-rate);
	}

	button:disabled {
		background-color: var(--btn-clr-deact);
		color: var(--btn-clr-deact-txt);
		font-weight: normal;
	}

	button:hover {
		filter: brightness(120%) saturate(120%);
	}

	button:active {
		filter: brightness(60%) saturate(150%);
	}

	button:disabled:hover,
	button:disabled:active {
		filter: none;
	}
</style>

<script lang="ts">
	export let value: Number | undefined;
	export let inputId: string;
	export let name: string;
	export let required: boolean;
	export let placeholder: string;
</script>

<label for={inputId}>
	<input type="number" id={inputId} {name} bind:value {required} step="0.01" />
	<span class="label-text">{placeholder}</span>
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.2rem;
		position: relative;
		--transition-rate: 200ms ease;
	}

	input {
		padding: 0.5rem;
		border: none;
		border-radius: 0;
		border-top-left-radius: var(--radius-btn);
		border-top-right-radius: var(--radius-btn);
		border: 2px solid rgba(0, 0, 0, 0);
		border-bottom: 2px solid var(--accnt-clr);
		background-color: var(--card-clr);
		color: var(--white-txt);
		transition: var(--transition-rate);
		font-family: var(--main-font);
	}

	input:focus {
		border-radius: var(--radius-card);
		border: none;
		outline: none;
		border: 2px solid var(--accnt-clr);
	}

	.label-text {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		color: var(--btn-clr-deact-txt);
		transition: var(--transition-rate);
	}

	input:focus ~ span {
		color: var(--accnt-clr);
		transform: translate(20px, -50%);
		font-size: 0.9rem;
		background-color: var(--card-clr);
	}

	input:valid ~ span {
		color: var(--accnt-clr);
		top: 0;
		transform: translate(20px, -50%);
	}

	input:-webkit-autofill,
	input:autofill {
		padding: 0.5rem;

		border: 2px solid rgba(0, 0, 0, 0);
		-webkit-border: 2px solid rgba(0, 0, 0, 0);
		border-bottom: 2px solid var(--accnt-clr);
		background-color: var(--card-clr);
		transition: var(--transition-rate);
		color: var(--tertiary-clr);

		-webkit-text-fill-color: var(--tertiary-clr);
		-webkit-box-shadow: 0 0 0px 1000px var(--card-clr) inset;
	}
</style>

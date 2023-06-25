<script lang="ts">
	import TextInput from '$lib/TextInput.svelte';
	import '$lib/styles/buttons.css';

	let status: string = '';
	let color: string = '#ffffff';
	let btnDisabled: boolean = true;

	$: status = status.toLocaleLowerCase().trim();

	$: if (!color || !status) {
		btnDisabled = true;
	} else {
		btnDisabled = false;
	}
</script>

{#if color}
	<form action="/admin/commissions?/newStatus" method="POST" autocomplete="off">
		<h3>New Status</h3>
		<TextInput
			name="status"
			bind:value={status}
			placeholder="Status"
			inputId="status-input-id"
			required={true}
		/>

		<TextInput bind:value={color} placeholder="Color" inputId="color-text-input" required={false} />

		<input
			class="color-input"
			type="color"
			name="color"
			id="status-color-input"
			required={true}
			bind:value={color}
		/>

		<button class="yl-btn" disabled={btnDisabled}>Create Order Status</button>
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
	}

	.color-input {
		width: 100%;
		height: 4rem;
	}
</style>

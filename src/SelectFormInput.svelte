<script lang="ts">
	export let options: { label: string; value: string }[] = [];
	export let name: string;
	export let required: boolean = false;
	export let inputId: string;
	export let label: string;
	export let selectedValue: string = '';
</script>

<label for={inputId}
	>{label}
	<select id={inputId} {name} {required} bind:value={selectedValue}>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</label>

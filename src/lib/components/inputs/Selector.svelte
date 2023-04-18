<script lang="typescript">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	interface IOptions {
		name: string;
		value: string;
	}
	export let value: string | null = null;
	let isOpen: boolean = false;
	let selected: string = 'Selecione uma opção';
	export let options: IOptions[];
	let cont: Element;
	const handleClick = (e: MouseEvent) => {
		if (!cont.contains(e.target as Node)) {
			isOpen = false;
		}
	};
	onMount(() => {
		document.addEventListener('click', handleClick);
	});
	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleClick);
		}
	});
</script>

<div id="container" bind:this={cont}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		id="boxName"
		on:click={() => (isOpen = !isOpen)}
		style="color: {isOpen ? 'var(--luminous-white)' : 'rgba(166, 166, 166, 0.7)'}"
	>
		{selected}
	</div>
	{#if isOpen}
		<div id="selectBox">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#each Array.from(options) as option}
				<div
					class="item"
					on:click={() => {
						isOpen = false;
						selected = option.name;
						value = option.value;
					}}
				>
					{option.name}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(body) {
		font-family: 'DM Sans', sans-serif;
		text-align: inherit;
	}
	#boxName {
		background: hsl(0, 7%, 12%);
		width: 500px;
		height: 50px;
		padding: 0 0.5rem;
		margin-top: 1rem;
		outline: none;
		color: rgba(166, 166, 166, 1);
		font-size: 1.76rem;
		border: 1px solid #040b18;
		border-radius: 8px;
		user-select: none;
		line-height: 50px;
	}
	#boxName:hover {
		cursor: pointer;
	}
	#selectBox {
		position: absolute;
		background: hsl(0, 7%, 12%);
		width: calc(500px + 1rem);
		overflow: hidden;
		margin-top: 0.1rem;
		outline: none;
		color: rgba(166, 166, 166, 0.7);
		font-size: 1.76rem;
		border: 1px solid #040b18;
		border-radius: 8px;
		user-select: none;
		line-height: 50px;
	}
	.item {
		padding: 0 0.5rem;
		width: 100%;
		display: flex;
		height: 50px;
		transition: all 0.1s;
	}
	.item:hover {
		background: hsl(0, 7%, 24%);
		cursor: pointer;
		color: var(--luminous-white);
	}
</style>

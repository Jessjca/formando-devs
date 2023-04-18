<script lang="typescript">
	import type { Writable } from 'svelte/store';

	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import GameController from '$lib/controllers/GameController';
	import type { IGameInfos, IRounds } from '$lib/interfaces/GameInterfaces';
	import { onMount } from 'svelte';
	import OverallResults from '$lib/components/gameComponents/OverallResults.svelte';

	export let data: { uuid: string };
	let rounds: IRounds[] | undefined;
	onMount(async () => {
		if (browser) {
			const res = await fetch(`http://localhost:5173/api/game/results`, {
				method: 'POST',
				body: JSON.stringify({
					uuid: data.uuid
				})
			});
			const jsonRes = (await res.json()) as { results: IRounds[] };
			rounds = jsonRes.results;
		}
	});
</script>

<Header />

<div id="container">
	{#if rounds}
		<h1>Resultados</h1>
		{#each rounds as round}
			<div class="result">
				<h2>{round.topic}</h2>
				<OverallResults votes={round.votes} />
				<hr />
			</div>
		{/each}
	{/if}
</div>

<style>
	h1 {
		font-size: 6vw;
	}
	#container {
		color: var(--luminous-white);
		margin-top: 8rem;
	}
	.result {
		text-align: left;
		padding-left: 5vw;
	}
</style>

<script lang="typescript">
	import type { IGameInfos, IVotes } from '$lib/interfaces/GameInterfaces';
	import Card from './card/Card.svelte';

	export let votes: IVotes[];

	$: lowest = votes.map((vote) => Number(vote.value))?.sort((a, b) => a - b)[0];
	$: highest = votes.map((vote) => Number(vote.value))?.sort((a, b) => b - a)[0];
	$: average = votes.map((vote) => Number(vote.value))?.reduce((a, b) => a + b, 0) / votes.length;
</script>

<div style="display:flex;jusitfy-content:space-around;gap:2vw;text-align:center;">
	<div>
		<Card fontSize={2} number={lowest?.toString()} width="15vw" />
		<h1><b>MENOR</b></h1>
	</div>
	<div>
		<Card fontSize={2} number={average?.toString()} width="15vw" />
		<h1><b>MÉDIA</b></h1>
	</div>
	<div>
		<Card fontSize={2} number={highest?.toString()} width="15vw" />
		<h1><b>MAIOR</b></h1>
	</div>
</div>

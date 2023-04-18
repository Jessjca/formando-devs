<script lang="typescript">
	import type GameController from '$lib/controllers/GameController';
	import type { IGameInfos } from '$lib/interfaces/GameInterfaces';
	import Card from './card/Card.svelte';

	export let gameController: GameController;
	let gameInfos: IGameInfos | undefined;
	gameController.gameInfos.subscribe((infos) => (gameInfos = infos));

	$: lowest = gameInfos!.actualVotes.map((vote) => Number(vote.value))?.sort((a, b) => a - b)[0];
	$: highest = gameInfos!.actualVotes.map((vote) => Number(vote.value))?.sort((a, b) => b - a)[0];
	$: average =
		gameInfos!.actualVotes.map((vote) => Number(vote.value))?.reduce((a, b) => a + b, 0) /
		gameInfos!.actualVotes?.length;
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

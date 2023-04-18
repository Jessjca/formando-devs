<script lang="typescript">
	import YellowBox from './YellowBox.svelte';
	import YellowSeparator from './YellowSeparator.svelte';
	import GameButton from '../buttons/GameButton.svelte';
	import type GameController from '$lib/controllers/GameController';
	import { GameStatus, type IGameInfos } from '$lib/interfaces/GameInterfaces';
	import { writableStore } from '$lib/stores/UserStore';
	import Results from './Results.svelte';
	import GameModal from './GameModal.svelte';

	export let gameController: GameController;

	let gameInfos: IGameInfos | undefined;
	gameController.gameInfos.subscribe((infos) => (gameInfos = infos));
	let showModal = false;
</script>

<GameModal bind:showModal {gameController} />

{#if gameInfos}
	<YellowBox style="width:60vw;margin-right:2vw;height: 85vh;position: relative;">
		<YellowSeparator style="display:flex;justify-content:space-around;align-items:center;">
			<h1>
				{#if gameInfos.actualTopic === undefined}
					Tópico da rodada
				{/if}
				{#if gameInfos.actualTopic}
					{gameInfos.actualTopic}
				{/if}
			</h1>
			{#if gameInfos.players.find((p) => p.owner === true)?.userName === $writableStore?.userName}
				<GameButton
					color="--luminous-white"
					hoverColor="--luminous-white"
					on:click={() => (showModal = true)}>+ Editar Tópico</GameButton
				>
			{/if}
		</YellowSeparator>
		{#if gameInfos.status === GameStatus.ShowResults}
			<p><b>RESULTADOS:</b></p>
			<div style="display:flex;justify-content:center;">
				<Results {gameController} />
			</div>
		{/if}
		{#if gameInfos?.actualVotes.length > 0}
			<YellowSeparator style="position:absolute;bottom:0;padding-left:1.5vw;">
				<p><b>RESULTADOS INDIVIDUAIS:</b></p>
				{#each gameInfos?.actualVotes as vote}
					<p><i class="fa-solid fa-user" /> {vote.userName} votou {vote.value}</p>
				{/each}
			</YellowSeparator>
		{/if}
	</YellowBox>
{/if}

<style>
	p {
		padding: 0 30px;
		font-size: 1.5vw;
	}
	p i {
		font-size: 1.7vw;
	}
</style>

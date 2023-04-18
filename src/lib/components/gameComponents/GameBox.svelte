<script lang="typescript">
	import YellowBox from './YellowBox.svelte';
	import YellowSeparator from './YellowSeparator.svelte';
	import Card from './card/Card.svelte';
	import type GameController from '$lib/controllers/GameController';
	import { GameStatus, type IGameInfos, type IUserInfos } from '$lib/interfaces/GameInterfaces';
	import Results from './Results.svelte';

	export let gameController: GameController;

	let gameInfos: IGameInfos | undefined;
	let userInfos: IUserInfos;
	gameController.userInfos.subscribe((infos) => (userInfos = infos));
	gameController.gameInfos.subscribe((infos) => (gameInfos = infos));

	function fade(node: Element, { delay = 0, duration = 200 }) {
		const o = +getComputedStyle(node).opacity;

		return {
			delay,
			duration,
			css: (t: number) => `transform:translateX(${(1 - t) * -50}px);opacity:${t}`
		};
	}
</script>

{#if gameInfos}
	<YellowBox style="width:60vw;margin-right:2vw;height: 85vh;">
		<YellowSeparator>
			<h1>
				{#if gameInfos.actualTopic === undefined}
					Tópico da rodada
				{/if}
				{#if gameInfos.actualTopic}
					{gameInfos.actualTopic}
				{/if}
			</h1>
		</YellowSeparator>
		{#if userInfos.roundRunning}
			<p><b>SELECIONE SEU VOTO:</b></p>
			<div style="display:flex;flex-wrap:wrap;gap:1vw;justify-content:center;">
				{#each gameInfos.cards as card, idx}
					<div in:fade={{ delay: idx * 50 }}>
						<Card
							width="9vw"
							fontSize={1}
							number={card.toString()}
							on:click={() => gameController.SelectCard(card.toString())}
						/>
					</div>
				{/each}
			</div>
		{/if}
		{#if gameInfos.status === GameStatus.ShowResults}
			<p><b>RESULTADOS:</b></p>
			<div style="display:flex;justify-content:center;">
				<Results {gameController} />
			</div>
		{/if}
	</YellowBox>
{/if}

<style>
	p {
		text-align: left;
		font-size: 1.5vw;
		padding-left: 1.5vw;
	}
</style>

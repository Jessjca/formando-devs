<script lang="typescript">
	import YellowBox from './YellowBox.svelte';
	import YellowSeparator from './YellowSeparator.svelte';
	import type GameController from '$lib/controllers/GameController';
	import type { IGameInfos, IUserInfos } from '$lib/interfaces/GameInterfaces';
	import GameButton from '../buttons/GameButton.svelte';

	export let gameController: GameController;
	let gameInfos: IGameInfos | undefined;
	let userInfos: IUserInfos;
	gameController.userInfos.subscribe((infos) => (userInfos = infos));
	gameController.gameInfos.subscribe((infos) => (gameInfos = infos));
</script>

{#if gameInfos}
	<YellowBox style="width:25vw;margin-left:2vw;height: 85vh;position:relative;"
		><YellowSeparator
			><h1>
				{#if gameInfos.status === 1}
					Aguardando Jogadores
				{:else}
					Inicie uma nova rodada
				{/if}
			</h1></YellowSeparator
		>
		<h2>Jogadores:</h2>
		<div id="playersDiv">
			{#each gameInfos?.players as player}
				<p>
					<i class="fa-solid fa-user" />
					{player.userName}
					{#if player.owner}
						<i class="fa-solid fa-crown" />
					{/if}
				</p>
			{/each}
		</div>
		<div id="buttonsContent">
			{#if gameInfos?.status >= 2}
				<br />
				<div class="whiteBox">
					<div style="width:90%;font-size:1vw;text-align:center;margin:2rem auto;">
						<div
							style="width:90%;height:0.7vw;background-color:gray;border-radius:120px;margin:auto;overflow:hidden"
						>
							<div
								style="width:{userInfos.width}%;height:100%;background-color:#fa3d55;transition:all 0.2s;"
							/>
						</div>
						TEMPORIZADOR DE 30 SEGUNDOS
					</div>
				</div>
			{/if}
			<div class="whiteBox" style="margin-top:1vw">
				<div style="width:90%;font-size:1.4vw;text-align:center;margin:2rem auto;font-weight:500">
					<i class="fa-solid fa-share-from-square" style="" /> COMPARTILHE ESSA SALA
				</div>
			</div>
			<div style="margin-left:3%;margin-top:1vw">
				<GameButton
					color="--outro-rosa"
					hoverColor="--active-outro-rosa"
					on:click={() => gameController.StartRound()}
					><i class="fa-solid fa-arrow-right-from-bracket" /> SAIR</GameButton
				>
			</div>
		</div></YellowBox
	>
{/if}

<style>
	h1 {
		margin: 0;
		text-align: center;
	}
	h2 {
		text-align: left;
		padding: 0 10px;
		font-weight: 200;
		font-size: 2vw;
		margin-bottom: 0;
	}
	p {
		padding: 0 30px;
		font-size: 1.5vw;
	}
	p i {
		font-size: 1.7vw;
	}
	#playersDiv {
		max-height: 40vh;
		overflow-y: auto;
		text-align: left;
	}
	#buttonsContent {
		position: absolute;
		width: 100%;
		bottom: 1vw;
	}
	.whiteBox {
		background-color: white;
		border-radius: 15px;
		width: 90%;
		margin: auto;
		display: flex;
		padding: 0.5vw;
		align-items: center;
	}
</style>

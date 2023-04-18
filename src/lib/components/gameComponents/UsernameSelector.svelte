<script lang="typescript">
	import YellowBox from './YellowBox.svelte';
	import YellowSeparator from './YellowSeparator.svelte';
	import GameButton from '../buttons/GameButton.svelte';
	import type GameController from '$lib/controllers/GameController';
	export let gameController: GameController;
	export let uuid: string;
	let userName: string;
</script>

<div id="container">
	<YellowBox style="width:25vw;"
		><YellowSeparator><h1>Escolha seu nome</h1></YellowSeparator>
		<input type="text" placeholder="Nome" bind:value={userName} />
		<div style="display:flex;justify-content:center;margin-bottom:2rem;">
			<GameButton
				on:click={() => gameController.SetUserName(userName, uuid)}
				color="--rosa-footer"
				hoverColor="--rosinha">Iniciar</GameButton
			>
		</div>
	</YellowBox>
</div>

<style>
	#container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30rem;
	}
	input {
		background: hsl(0, 7%, 12%);
		width: 250px;
		height: 50px;
		padding: 0 0.5rem;
		margin: 3rem auto;
		outline: none;
		color: rgba(166, 166, 166);
		font-size: 1.8rem;
		border: 1px solid #040b18;
		border-radius: 8px;
	}
	h1 {
		margin: 0;
		text-align: center;
	}
</style>

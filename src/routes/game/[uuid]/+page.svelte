<script lang="typescript">
	import InGameHeader from '$lib/components/InGameHeader.svelte';
	import { onMount } from 'svelte';
	import { writableStore } from '$lib/stores/UserStore';
	import type { IGameInfos } from '$lib/interfaces/GameInterfaces';
	import GameController from '$lib/controllers/GameController';
	import UsernameSelector from '$lib/components/gameComponents/UsernameSelector.svelte';
	import GameBox from '$lib/components/gameComponents/GameBox.svelte';
	import OwnerGameBox from '$lib/components/gameComponents/OwnerGameBox.svelte';
	import PlayersBox from '$lib/components/gameComponents/PlayersBox.svelte';
	import OwnerPlayersBox from '$lib/components/gameComponents/OwnerPlayersBox.svelte';

	let gameController = new GameController();

	/** @type {import('./$types').PageData} */
	export let data: { uuid: string; status: number; hasUsername: boolean };
	let gameInfos: IGameInfos | undefined;
	gameController.gameInfos.subscribe((infos) => {
		gameInfos = infos;
	});
	onMount(() => {
		gameController.OnMount();
	});
</script>

<InGameHeader />
{#if $writableStore?.userName && gameInfos}
	<div
		style="width:100%;height:100%;display:flex;justify-content:center;align-items:flex-start;margin-top:10rem;"
	>
		{#if gameInfos.status >= 2}
			{#if gameInfos.players.find((p) => p.owner === true)?.userName === $writableStore.userName}
				<OwnerGameBox {gameController} />
			{:else}
				<GameBox {gameController} />
			{/if}
		{/if}

		{#if gameInfos.players.find((p) => p.owner === true)?.userName === $writableStore.userName}
			<OwnerPlayersBox {gameController} />
		{:else}
			<PlayersBox {gameController} />
		{/if}
	</div>
{:else}
	<UsernameSelector {gameController} uuid={data.uuid} />
{/if}

<style>
</style>

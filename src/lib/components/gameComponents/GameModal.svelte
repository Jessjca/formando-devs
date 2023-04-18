<script lang="typescript">
	import type GameController from '$lib/controllers/GameController';
	import YellowBox from './YellowBox.svelte';
	import YellowSeparator from './YellowSeparator.svelte';

	export let showModal: boolean;
	export let gameController: GameController;
	let dialog: HTMLDialogElement;
	let topic: string;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<YellowBox style="width:30vw;text-align:center;">
			<YellowSeparator><h1>Selecione o Tópico</h1></YellowSeparator>
			<form
				on:submit={() => {
					gameController.UpdateTopic(topic);
					dialog.close();
				}}
			>
				<input type="text" placeholder="Tópico" bind:value={topic} />
			</form>
		</YellowBox>
	</div>
</dialog>

<style>
	dialog {
		border: none;
		padding: 0;
		background: transparent;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
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
</style>

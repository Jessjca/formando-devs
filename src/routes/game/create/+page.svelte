<script lang="typescript">
	import { goto } from '$app/navigation';
	import banner from '$lib/assets/banner.png';
	import FilledButton from '$lib/components/buttons/FilledButton.svelte';
	import Selector from '$lib/components/inputs/Selector.svelte';
	let votingMethod: string;
	let userName: string;
	import { getContext, setContext } from 'svelte';
	import { writableStore } from '$lib/stores/UserStore';
</script>

<div id="container">
	<div id="infos">
		<h1>Crie sua planning</h1>

		<div class="alternative">
			<span>♣</span>
		</div>

		<form>
			<label for="tst1">
				<span>Sistema de votação</span>
				<Selector
					bind:value={votingMethod}
					options={[
						{ name: 'Fibonacci', value: 'fibonacci' },
						{ name: 'Harmônica', value: 'harmonic' },
						{ name: 'Telescópica', value: 'telescopica' },
						{ name: 'Sequencial', value: 'sequencia' }
					]}
				/>
			</label>

			<label for="name">
				<span>Usuário</span>
				<input type="text" bind:value={userName} />
			</label>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="filledBtnContainer"
				on:click={async () => {
					if (votingMethod !== undefined && userName !== undefined) {
						const res = await fetch('http://localhost:5173/api/game/createGame', {
							method: 'POST',
							body: JSON.stringify({
								votingMethod,
								userName
							})
						});
						const data = await res.json();
						writableStore.set({ userName: userName, uuid: data.gameId });
						goto(`/game/${data.gameId}`);
						//window.location.replace('http://localhost:5173/game/' + data.gameId);
					}
				}}
			>
				<FilledButton hoverColor="--active-outro-rosa" href="" color="--outro-rosa"
					>Crie uma nova planning</FilledButton
				>
			</div>
		</form>
	</div>
	<div class="images">
		<img src={banner} alt="Mobile" />
		<div class="circle" />
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Poppins', sans-serif;
		text-align: inherit;
	}
	#container {
		display: flex;
		background: hsl(30, 11%, 15%);
		color: white;
		font-weight: 500;
		display: flex;
		min-height: 100vh;
		min-width: 100vw;
	}
	#infos {
		width: 50vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	h1 {
		color: hsl(58, 81%, 87%);
		font-size: 5.2rem;
		margin-bottom: 4rem;
		margin-top: 0;
		text-align: center;
	}
	.alternative {
		margin-top: 0rem;
	}
	.alternative span {
		font-size: 2rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.3);
		position: relative;
	}
	.alternative span::after {
		left: 50px;
		position: absolute;
		content: '';
		height: 1px;
		width: 100px;
		bottom: 50%;
		right: 50px;
		background: rgba(255, 255, 255, 0.3);
	}
	.alternative span::before {
		position: absolute;
		content: '';
		height: 1px;
		width: 100px;
		bottom: 50%;
		right: 50px;
		background: rgba(255, 255, 255, 0.3);
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	form label {
		display: flex;
		flex-direction: column;
	}
	label span {
		font-size: 1.8rem;
		margin-top: 3rem;
	}
	form input {
		background: hsl(0, 7%, 12%);
		width: 500px;
		height: 50px;
		padding: 0 0.5rem;
		margin-top: 1rem;
		outline: none;
		color: rgba(166, 166, 166);
		font-size: 1.8rem;
		border: 1px solid #040b18;
		border-radius: 8px;
	}
	.filledBtnContainer {
		margin-top: 6rem;
	}

	.images img {
		max-width: 100%;
		z-index: 3;
	}
	.images {
		width: 50vw;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 2.5rem;
	}
	.images .circle {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background: linear-gradient(45deg, #f0e0db, #f79492);
		clip-path: circle(40% at right 80%);
		z-index: 2;
	}
</style>

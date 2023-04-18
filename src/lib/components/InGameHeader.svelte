<script>
	import logo from '$lib/assets/logo.png';
	import FilledButton from './buttons/FilledButton.svelte';
	import FloatingButton from './buttons/FloatingButton.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div id="container">
	<div id="wrapper">
		<a class="logo" href="#home">
			<img src={logo} alt="saint-marie-logo" />
		</a>
	</div>
</div>

<style>
	#container {
		display: flex;
		height: var(--nav-height);
		border-bottom: 0.3rem solid var(--roxo);
		position: fixed;
		top: 0;
		width: 100vw;
		margin: auto;
		background: var(--rosa-footer);
		z-index: 100;
	}
	#wrapper {
		width: min(105rem, 100%);
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-inline: auto;
		padding-inline: 2.4rem;
	}
	#wrapper * {
		margin: 0;
		padding: 0;
		visibility: initial;
		display: initial;
		opacity: initial;
		flex-direction: initial;
		position: initial;
		font-size: initial;
		font-weight: initial;
		transform: initial;
		color: initial;
		background-color: initial;
		filter: initial;
	}
	.logo img {
		width: 67%;
	}
</style>

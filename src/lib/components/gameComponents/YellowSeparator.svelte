<script lang="typescript">
	export let style: string = '';
</script>

<div id="container" {style}><slot /></div>

<style>
	#container {
		background-color: var(--gameBoxSecondary);
		width: 100%;
		padding: 1rem 0;
	}
</style>

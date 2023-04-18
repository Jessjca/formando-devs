<script lang="typescript">
	export let style: string = '';
</script>

<div id="container" {style}><slot /></div>

<style>
	#container {
		overflow: hidden;
		background-color: var(--gameBoxPrimary);
		border-radius: 10px;
	}
</style>

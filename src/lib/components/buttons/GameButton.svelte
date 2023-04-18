<script>
	/**
	 * @type string
	 */
	export let color;
	/**
	 * @type string
	 */
	export let hoverColor;
</script>

<div>
	<button on:click style="--color: var({color});--hoverColor: var({hoverColor})"><slot /></button>
</div>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem 3rem;
		border: none;
		border-radius: 10px;
		background-color: var(--color);
		color: var(--bg-black);
		font-weight: 700;
		font-size: 2rem;
		line-height: 2rem;
		gap: 1.6rem;
		text-decoration: none;
		transition: background 200ms;
		width: fit-content;
	}
	button:hover {
		background-color: var(--hoverColor);
		border: none;
		cursor: pointer;
	}
</style>

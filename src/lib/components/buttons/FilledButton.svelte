<script>
	/**
	 * @type string
	 */
	export let href;
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
	<a {href} style="--color: var({color});--hoverColor: var({hoverColor})"><slot /></a>
</div>

<style>
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 2.4rem;
		border: none;
		border-radius: 4rem;
		background-color: var(--color);
		color: var(--luminous-white);
		font-weight: 700;
		font-size: 1.6rem;
		line-height: 1.8rem;
		text-transform: uppercase;
		gap: 1.6rem;
		text-decoration: none;
		transition: background 200ms;
		width: fit-content;
	}
	a:hover {
		background-color: var(--hoverColor);
		border: none;
	}
</style>

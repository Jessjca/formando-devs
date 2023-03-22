<script>
	/**
	 * @type string
	 */
	export let href;
</script>

<div>
	<a {href}><slot /></a>
</div>

<style>
	a {
		color: var(--luminous-white);
		transition-duration: 0.2s;
		text-decoration: none;
		text-transform: uppercase;
		line-height: 3.1rem;
	}
	a:hover {
		color: var(--primary-orange);
	}
</style>

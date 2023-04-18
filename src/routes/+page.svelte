<script>
	import Header from '$lib/components/Header.svelte';
	import HomeDescription from '$lib/components/homeSections/HomeDescription.svelte';
	import HomeExplanation from '$lib/components/homeSections/HomeExplanation.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Header />
<HomeDescription />
<HomeExplanation />
<Footer />

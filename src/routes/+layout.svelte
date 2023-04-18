<slot />

<style>
	:global(body) {
		font-family: 'DM Sans';
		font-size: 1.6rem;
		text-align: center;
		overflow: auto;
		width: 100%;
		margin: 0;
		background-color: var(--roxo);
		background-color: hsl(30, 11%, 15%);
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:root {
		--primary-orange: hsl(342, 40%, 18%);
		--roxo: hsl(41, 84%, 82%);
		--rosa-footer: hsl(353, 81%, 75%);
		--outro-rosa: #f6b6c0;
		--active-outro-rosa: #f390a9;
		--hover-orange: hsl(342, 39%, 38%);
		--primary-purple: hsl(330, 58%, 44%);
		--primary-grey: hsl(0, 0%, 61%);
		--rosinha: hsl(352, 85%, 63%);
		--luminous-white: hsl(0, 0%, 97%);
		--gameBoxPrimary: #f1e7db;
		--gameBoxSecondary: #ffe4c4;
		--bg-grey: hsl(30, 11%, 15%);
		--bg-black: hsl(0, 7%, 12%);

		font-size: 62.5%; /* 1rem = 10px, Com isso pode usar REM à vontade */

		--nav-height: 7.2rem;
	}
</style>

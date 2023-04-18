<script lang="typescript">
	export let width: string = '420px';
	export let fontSize: number = 3;
	export let number: string = '';
</script>

<button id="container" style="width:{width};" on:click>
	<div id="whiteRec">
		<div id="pinkRec">
			<div class="esf1" />
			<div class="esf2" />
			<div class="esf3" />
			<div class="num" style="position: absolute; top: 1%; left: 5%; font-size: {fontSize}vw">
				<p style="color: #330d43; z-index: 40">{number}</p>
				<p style="position: absolute; top: 2%; color: #ffffff; z-index: 30">{number}</p>
				<p style="position: absolute; top: 4%; color: #330d43; z-index: 20">{number}</p>
			</div>
			<div class="num" style="position: absolute; bottom: 1%; right: 5%; font-size: {fontSize}vw">
				<p style="color: #330d43; z-index: 40">{number}</p>
				<p style="position: absolute; top: 2%; color: #ffffff; z-index: 30">{number}</p>
				<p style="position: absolute; top: 4%; color: #330d43; z-index: 20">{number}</p>
			</div>
			<div class="num" style="font-size:{fontSize * 4}vw">
				<p style="color: #330d43; z-index: 40;">{number}</p>
				<p style="position: absolute; top: 2%; color: #ffffff; z-index: 30">{number}</p>
				<p style="position: absolute; top: 4%; color: #330d43; z-index: 20">{number}</p>
			</div>
		</div>
	</div>
</button>

<style>
	#container {
		font-family: 'Lemon/Milk light', sans-serif;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 420px;
		aspect-ratio: 0.7;

		background: #330d43;
		border-radius: 15px;
		user-select: none;
		transition: all 0.2s;
	}
	#container:hover {
		cursor: pointer;
		transform: translateY(-5%);
	}
	#whiteRec {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 95%;
		height: 95%;

		background: #f7f2d7;
		border-radius: 15px;
	}
	#pinkRec {
		position: relative;
		width: 92%;
		height: 95%;

		background: #f38c98;
		border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.esf1 {
		position: absolute;
		bottom: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: 55%;
		height: 0%;
		padding-bottom: 55%;
		border-radius: 50%;
		background: #f9a1ac;
	}

	.esf2 {
		position: absolute;
		bottom: 40%;
		left: 2.5%;
		width: 55%;
		height: 0%;
		padding-bottom: 55%;
		border-radius: 50%;
		background: #f87484;
	}

	.esf3 {
		position: absolute;
		bottom: 40%;
		left: 43%;
		width: 55%;
		height: 0%;
		padding-bottom: 55%;
		border-radius: 50%;
		background: #f25468;
	}
	.num {
		z-index: 10;
		font-size: 1500%;
		position: relative;
	}
	.num p {
		text-align: center;
		margin: 0;
		position: relative;
	}
</style>

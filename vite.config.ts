import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
//import { GameRequest, GameStatus, type IGameInfos } from './src/lib/interfaces/GameInterfaces';
import WebSocketsServer from './src/websockets/WebSocketsServer';
function fibonacci(num: number) {
	// x is representing the first term,
	// y is representing the second term, and
	// z is representing the sum of x and y.
	var answer = [];
	var x = 0;
	var y = 1;
	var z;

	// Since, the first two elements are fixed.
	// Storing the first two terms.
	answer.push(x);
	answer.push(y);

	var i = 2;
	while (i < num) {
		z = x + y;
		x = y;
		y = z;

		// Storing the current element
		answer.push(z);
		i = i + 1;
	}
	return answer;
}
// interface IPlayerGames {
// 	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
// 	owner: boolean,
// 	gameUuid: string,
// }

// const games: IPlayerGames[] = []

// const prisma = new PrismaClient()
const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		// console.log('Servidor ws inicializado!');
		// const wss = new Server(server.httpServer!);
		// wss.on("connection", ws => {
		/// 	ws.emit('connected')
		// 	ws.on("message", async (d) => {
		// 		const data = d as { values: any, status: number }
		// 		switch (data.status) {
		// 			case 0: // AO ENTRAR NO URL
		// 				// Obtendo informações do jogo solicitado
		// 				const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 				const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 				// Verificando se o jogo já foi criado
		// 				if (gameInfos.status === 0) {
		// 					// O jogo ainda não foi criado, inserir o jogador como dono
		// 					games.push({ gameUuid: data.values.uuid, socket: ws, owner: true })
		// 					gameInfos.players.push({ userName: data.values.userName, owner: true, id: ws.id })
		// 					if (gameInfos.votingMethod === "fibonacci") {
		// 						gameInfos.cards = fibonacci(12)
		// 					}
		// 					gameInfos.status = 1
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					ws.emit('gameUpdate', gameInfos)
		// 				}
		// 				// O jogo já foi criado, inserindo o jogador como um player a mais
		// 				else if (gameInfos.status !== 0) {
		// 					games.push({ gameUuid: data.values.uuid, socket: ws, owner: false })
		// 					gameInfos.players.push({ userName: data.values.userName, owner: false, id: ws.id })
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					games.filter(game => game.gameUuid === data.values.uuid).forEach(gamePlayer => {
		// 						gamePlayer.socket.emit('gameUpdate', gameInfos)
		// 					})
		// 				}
		// 				break;
		// 			case GameRequest.StartGame: // AO INICIAR O JOGO
		// 				{
		// 					// Obtendo informações do jogo solicitado
		// 					const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 					const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 					gameInfos.status = 2
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					games.filter(game => game.gameUuid === data.values.uuid).forEach(gamePlayer => {
		// 						const copyGamesinfos = gameInfos
		// 						if (!gamePlayer.owner) {
		// 							copyGamesinfos.actualTopic = undefined
		// 						}
		// 						gamePlayer.socket.emit('gameUpdate', copyGamesinfos)
		// 					})
		// 				}
		// 				break;
		// 			case GameRequest.UpdateTopic: // AO TROCAR O TÓPICO
		// 				{
		// 					// Obtendo informações do jogo solicitado
		// 					const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 					const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 					// Alterando apenas no database 
		// 					gameInfos.actualTopic = data.values.topic
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					ws.emit('gameUpdate', gameInfos)
		// 				}
		// 				break;
		// 			case GameRequest.StartRound: // AO INICIAR A RODADA
		// 				{
		// 					// Obtendo informações do jogo solicitado
		// 					const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 					const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 					// Mostrar tópico para todos
		// 					gameInfos.status = 3
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					games.filter(game => game.gameUuid === data.values.uuid).forEach(gamePlayer => {
		// 						gamePlayer.socket.emit('gameUpdate', gameInfos)
		// 					})
		// 				}
		// 				break;
		// 			case GameRequest.SelectCard: // AO SELECIONAREM UMA CARTA
		// 				{
		// 					// Obtendo informações do jogo solicitado
		// 					const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 					const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 					// Mostrar tópico para todos
		// 					gameInfos.status = GameStatus.CardSelected
		// 					gameInfos.actualVotes.push({ id: ws.id, value: data.values.card, userName: data.values.userName })
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })

		// 					if (gameInfos.actualVotes.length === gameInfos.players.length - 1) {
		// 						gameInfos.status = GameStatus.RoundEnded
		// 						await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 						games.filter(game => game.gameUuid === data.values.uuid).forEach(gamePlayer => {
		// 							gamePlayer.socket.emit('gameUpdate', gameInfos)
		// 						})
		// 						return
		// 					}

		// 					games.find(game => game.owner === true)?.socket.emit('gameUpdate', gameInfos)
		// 				}
		// 				break;
		// 			case GameRequest.EndRound: // AO FINALIZAR O ROUND
		// 				{
		// 					// Obtendo informações do jogo solicitado
		// 					const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 					const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 					gameInfos.status = GameStatus.RoundEnded
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					games.filter(game => game.gameUuid === data.values.uuid).forEach(gamePlayer => {
		// 						gamePlayer.socket.emit('gameUpdate', gameInfos)
		// 					})
		// 				}
		// 				break;
		// 			case GameRequest.ShowResults: // AO MOSTRAR RESULTADOS
		// 				{
		// 					// Obtendo informações do jogo solicitado
		// 					const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 					const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 					gameInfos.status = GameStatus.ShowResults
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					games.filter(game => game.gameUuid === data.values.uuid).forEach(gamePlayer => {
		// 						gamePlayer.socket.emit('gameUpdate', gameInfos)
		// 					})
		// 				}
		// 				break;
		// 			case GameRequest.NewRound: // NOVA RODADA
		// 				{
		// 					// Obtendo informações do jogo solicitado
		// 					const game = await prisma.game.findFirst({ where: { id: data.values.uuid } })
		// 					const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 					gameInfos.status = GameStatus.AwaitingRound
		// 					gameInfos.rounds.push({ topic: gameInfos.actualTopic!, votes: gameInfos.actualVotes })
		// 					gameInfos.actualTopic = undefined
		// 					gameInfos.actualVotes = []
		// 					await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 					games.filter(game => game.gameUuid === data.values.uuid).forEach(gamePlayer => {
		// 						gamePlayer.socket.emit('gameUpdate', gameInfos)
		// 					})
		// 				}
		// 				break;
		// 		}
		// 	});
		// 	ws.on("disconnect", async () => {
		// 		const uuid = games.find(game => game.socket === ws)?.gameUuid
		// 		if (!uuid) {
		// 			return
		// 		}
		// 		const game = await prisma.game.findFirst({ where: { id: uuid } })
		// 		const gameInfos = JSON.parse(game?.infos as string) as IGameInfos
		// 		gameInfos.players = gameInfos.players.filter(player => player.id !== ws.id)
		// 		await prisma.game.update({ where: { id: uuid }, data: { infos: JSON.stringify(gameInfos) } })
		// 		games.filter(game => game.gameUuid === uuid).forEach(gamePlayer => {
		// 			gamePlayer.socket.emit('gameUpdate', gameInfos)
		// 		})
		// 	});
		// });
		const wss = new WebSocketsServer(server)
		wss.StartServer()
		wss.ListenMessages()
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});

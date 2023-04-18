import { PrismaClient } from "@prisma/client"
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface IPlayer {
			userName: string,
			owner: boolean,
		}
		interface IGameInfos {
			status: number,
			votingMethod: string,
			players: IPlayer[],
		}
	}
}

export { };

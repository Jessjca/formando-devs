import { writable } from "svelte/store";
interface IUser {
    userName: string;
    uuid: string;
}
const writableStore = writable<IUser | undefined>(undefined)
export { writableStore }
interface IPlayer {
    userName: string;
    owner: boolean;
    id: string;
}
export interface IVotes {
    id: string;
    value: string;
    userName: string;
}
export interface IRounds {
    votes: IVotes[]
    topic: string;
}
export interface IGameInfos {
    status: number;
    votingMethod: string;
    players: IPlayer[];
    cards: number[];
    actualTopic: string | undefined;
    actualVotes: IVotes[];
    rounds: IRounds[]
}
export interface IUserInfos {
    width: number;
    roundRunning: boolean;
}
export enum GameStatus {
    NoOwner,
    AwaitingPlayers,
    AwaitingRound,
    RoundStarted,
    RoundEnded,
    ShowResults,
    CardSelected
}
export enum GameRequest {
    HandleJoin,
    StartGame,
    UpdateTopic,
    StartRound,
    SelectCard,
    EndRound,
    ShowResults,
    NewRound,
}
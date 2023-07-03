# Planning Poker

Esse projeto foi desenvolvido com HTML, SCSS. Foi utilizado o framework Angular.

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)



# Como executar

Após clonar o repositório, siga os seguintes passos para executar:

Adicione a pasta node_modules da API e do Angular com:

```
npm install
```

```
cd ./api/
npm install
```


Compile o arquivo .js a partir do tsc na API:

```
npx tsc
```

E então, realize a migration com:

```
npx prisma migrate
```

Após isto, apenas execute o `ng serve` na raiz do projeto para inicializar o servidor Angular, e após isto utilize `node api.js` dentro da pasta de distribuição da API para inicializar o backend.

# Funcionamento do jogo

O funcionamento do jogo consiste na parte frontend desenvolvida na framework Angular, com um servidor backend executando um servidor Express em conjunto com um servidor Websockets, interagindo com um banco de dados local SqLite por meio do ORM Prisma.
A escolha do banco de dados SqLite foi feita para facilitar o desenvolvimento e migration da aplicação, caso necessário a troca pode ser rapidamente feita pela conexão do Prisma.
Juntamente na parte do frontend, há o Controller `GameController`, responsável por intermediar e gerenciar o a visualização do frontend com os eventos do WebSockets.

![Diagrama geral Plaker](https://i.imgur.com/SqomHVy.png)

## Model da database

Para enderessar os URL's de cada partida sem possuir um incremento unitário, foi utilizado como chave primária uma string gerada por um `UUID v4`, isto possibilita utilizar o ID de cada partida sem correr riscos de um usuário entrar em outra partida não desejada.
As informações de cada partida foram armazenadas em uma string JSON que é convertida e gerenciada pelo `WebSocketEvents`, onde recebe e lida com os os eventos e estados recebidos dos jogadores dentro do jogo.
Há apenas um único model, já que não há necessidade de salvar o nome e perfil de jogadores.

```
model Game {
  id String @id @default(uuid())
  infos String
}
```

## Informações do jogo

As informações do jogo que são constantemente transferidas a partir dos eventos do WebSockets, consiste no seguinte objeto JSON:

```
interface IPlayer {
    userName: string;
    owner: boolean;
    id: string;
}
interface IVotes {
    id: string;
    value: string;
    userName: string;
}
interface IRounds {
    votes: IVotes[]
    topic: string;
}
interface IGameInfos {
    status: number;
    votingMethod: string;
    players: IPlayer[];
    cards: string[];
    actualTopic: string | undefined;
    actualVotes: IVotes[];
    rounds: IRounds[]
}
```

Vale lembrar que armazenar informações diretamente como texto no banco de dados não é o mais performático, porém, neste caso que exige a constante manipulação e transferência de informações em JSON e simplicidade do projeto, foi adotado o uso de strings.

## Estados do jogo e eventos do WebSockets

A comunicação entre o servidor e o jogo pelo WebSockets, é organizada por estados e ações realizadas no jogo. Para melhor organização, foram separados em `enums` os estados e tipos de ações do jogo:

```
enum GameStatus {
    NoOwner,
    AwaitingPlayers,
    AwaitingRound,
    RoundStarted,
    RoundEnded,
    ShowResults,
    CardSelected
}
enum GameRequest {
    HandleJoin,
    StartGame,
    UpdateTopic,
    StartRound,
    SelectCard,
    EndRound,
    ShowResults,
    NewRound,
}
```
# formando-devs

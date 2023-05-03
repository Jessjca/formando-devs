import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRounds, IVotes } from 'api/interfaces/GameInterfaces';

interface IGameVotesReturn {
    votes: IRounds[]
}

@Component({
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsPageComponent implements OnInit {

    gameRounds: IRounds[] = []
    private route: ActivatedRoute
    private http: HttpClient
    private uuid!: string

    constructor(route: ActivatedRoute, http: HttpClient) {
        this.route = route
        this.http = http
    }


    NumberParser(character: string) {
        if (character === "☕") {
            return -200
        } else if (character === "∞") {
            return 200
        } else if (character === "?") {
            return 0
        }
        return Number(character)
    }

    GetValue(number: number): string {
        /*if (number < -100) {
         return "☕"
       }*/         // TODO: Ajustar a opção de café

        if (number > 100) {
            return "∞"
        }
        if (number < 2 && number > -2) {
            return "?"
        }
        return number.toFixed(0).toString()
    }

    GetLowest(votes: IVotes[]) {
        return this.GetValue(votes.map((vote) => this.NumberParser(vote.value))?.sort((a, b) => a - b)[0])
    }
    GetAverage(votes: IVotes[]) {
        return this.GetValue(votes.map((vote) => this.NumberParser(vote.value))?.reduce((a, b) => a + b, 0) / votes?.length)
    }
    GetHighest(votes: IVotes[]) {
        return this.GetValue(votes.map((vote) => this.NumberParser(vote.value))?.sort((a, b) => b - a)[0])
    }

    private async GetResults(uuid: string) {
        this.http.post<IGameVotesReturn>('http://localhost:3000/api/game/getResults',
            JSON.stringify({
                uuid: this.uuid
            }),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }

        ).subscribe(data => {
            this.gameRounds = data.votes
        })
    }

    ngOnInit() {
        this.route.params.subscribe(value => this.uuid = value["uuid"]);
        this.GetResults(this.uuid)
    }


}

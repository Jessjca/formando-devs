import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface ICreateGameReturn {
    game: string;
}

@Component({
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    gameData!: FormGroup
    private router: Router
    private http: HttpClient

    constructor(router: Router, http: HttpClient) {
        this.router = router
        this.http = http
    }

    ngOnInit(): void {
        this.gameData = new FormGroup({
            votingMethod: new FormControl(''),
            userName: new FormControl(''),
        })
    }

    async CreateGame() {
        await this.http.post<ICreateGameReturn>('http://localhost:3000/api/game/createGame', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                votingMethod: this.gameData.value.votingMethod,
                userName: this.gameData.value.userName
            })
        }).subscribe(data => {
            this.router.navigate(['/game/' + data.game])
        })


    }
}

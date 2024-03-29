import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface ICreateGameReturn {
    game: string;
}

@Component({
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    dropdownError: boolean = false
    usernameError: boolean = false
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
        if (this.gameData.value.votingMethod === '') {
            this.dropdownError = true
            return
        }
        if (this.gameData.value.userName.length < 3) {
            this.usernameError = true
            return
        }
        await this.http.post<ICreateGameReturn>('http://localhost:3000/api/game/createGame',
            JSON.stringify({
                votingMethod: this.gameData.value.votingMethod,
                userName: this.gameData.value.userName
            }),

            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }

        ).subscribe(data => {
            this.router.navigate(['/game/' + data.game])
        })


    }
}

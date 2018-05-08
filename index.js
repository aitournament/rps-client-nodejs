const axios = require("axios");
const WebSocket = require("isomorphic-ws");

const DOMAIN = "aitournament-rps.herokuapp.com";

class RPSClient {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.api_url = "https://" + DOMAIN;
        this.ws_url = "wss://" + DOMAIN;
    }

    playMatch(matchId, moveFn) {
        let self = this;
        let yourHistory = [];
        let opponentHistory = [];
        let metadata = {};
        let firstPlayer = true;
        let ws = new WebSocket(this.ws_url + "/ws/matches/" + matchId);
        ws.onopen = function () {
            ws.send(JSON.stringify({
                type: "AUTH",
                data: {
                    username: self.username,
                    password: self.password
                }
            }));
        };

        let makeMove = function () {
            if (yourHistory.length >= metadata.rounds) {
                return;
            }
            let move = moveFn(yourHistory, opponentHistory);
            ws.send(JSON.stringify({
                type: "MOVE",
                data: {
                    round: yourHistory.length,
                    move: move
                }
            }))
        };

        ws.onmessage = function (message) {
            let event = JSON.parse(message.data);
            if (event.type === "METADATA") {
                metadata = event.data;
                if (metadata.player1 === self.username) {
                    firstPlayer = true;
                } else if (metadata.player2 === self.username) {
                    firstPlayer = false;
                } else {
                    console.log("Invalid username");
                    ws.close();
                }
                makeMove();
            } else if (event.type === "MOVE") {
                if (firstPlayer) {
                    yourHistory.push(event.data.player1);
                    opponentHistory.push(event.data.player2);
                } else {
                    yourHistory.push(event.data.player2);
                    opponentHistory.push(event.data.player1);
                }
                makeMove();
            }
        };
        ws.onclose = function (info) {
            console.log("Websocket closed:", info.code, info.reason);
        }
    }
}

Client.ROCK = "ROCK";
Client.PAPER = "PAPER";
Client.SCISSORS = "SCISSORS";
module.exports = Client;
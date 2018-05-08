# AiTournament rock paper scissors client SDK
[![npm](https://img.shields.io/npm/v/aitournament-rps-client.svg)](https://www.npmjs.com/package/aitournament-rps-client)

Website: https://rps.aitournament.com

Create a match online to get a matchId / credentials

## Quick Start
```javascript
let Client = require("aitournament-rps-client");

let username = "player2";
let password = "pass";
let matchId = "ABCDE";

let client = new Client(username, password);

client.playMatch(matchId, function (myPreviousMoves, opponentPreviousMoves) {
    // Using the superior "only scissors" strategy
    return Client.SCISSORS;
});
```
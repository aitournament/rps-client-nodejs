# AiTournament rock paper scissors client SDK

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
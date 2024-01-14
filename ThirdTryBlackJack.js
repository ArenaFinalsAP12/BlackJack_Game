// This is my third attempt to create a BlackJack Game
// Remember that you need to add win conditions to check who won that particular game and maybe find out
// why the canHit flag works?
// You also need to think about how to make this game repeat until there are no more cards left in deck.

var hidden;
var winner;

// var cards = [];

var canHit = true; 
var nextTurn = false;

var playerScore = 0;
var dealerScore = 0;

var dealerSum = 0;
var playerSum = 0;

var playerAces = 0;
var dealerAces = 0;

var playerHand = [];
var dealerHand = [];

let discardedCards = [];
// Remember that the YouTube tutorial uses window.onload() = function()

createDeck();
shuffleDeck(cards); // This line is the current issue!!
startGame();


function createDeck () {
    cards = [];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            cards.push(values[i] + "-" + suits[j]); // Don't know if ".png" is necessary
        }
    }
    return cards;
}

function shuffleDeck (cards) {
    for (let i = 0; i < cards.length; i++) {
        let j = Math.floor(Math.random() * cards.length); // (0-1) * 52 => (51.9999)
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }   
    console.log(cards);
}

function startGame () {
    hidden = cards.pop(); 
    dealerSum+= getValue(hidden);
    // console.log(dealerSum);
    dealerAces+= checkIfAce(hidden);
    // console.log(hidden);
    // console.log(dealerAces);
    while (dealerSum < 17) {
        let dealerCardImg = document.createElement("img"); // <img src="./cards/4-C.png">
        let dealerCard = cards.pop();
        dealerCardImg.src = "./cards/" + dealerCard + ".png";
        dealerSum += getValue(dealerCard);
        dealerAces +=checkIfAce(dealerCard);
        document.getElementById("DealerCardsShow").append(dealerCardImg);
    }
    console.log(dealerSum);

    for (var i = 0; i < 2; i++) {
        let playerCardImg = document.createElement("img");
        let playerCard = cards.pop();
        playerCardImg.src = "./cards/" + playerCard + ".png";
        playerSum += getValue(playerCard);
        playerAces += checkIfAce(playerCard);
        document.getElementById("PlayerCardsShow").append(playerCardImg);
    }
    console.log(playerSum);
    document.getElementById("HitButton").addEventListener("click", hit); // Not sure why these are within the function and 
    document.getElementById("StayButton").addEventListener("click", stay); // not in the global scope?
}

function hit () {
    if (!canHit) {
        return;
    }
    let playerCardImg = document.createElement("img");
    let playerCard = cards.pop();
    playerCardImg.src = "./cards/" + playerCard + ".png";
    playerSum += getValue(playerCard);
    playerAces += checkIfAce(playerCard);
    document.getElementById("PlayerCardsShow").append(playerCardImg);

    if (reduceAce(playerSum, playerAces) > 21) { // A, J, K => 21 
        canHit = false;
    }
}

function stay () {
    playerSum = reduceAce(playerSum, playerAces);
    dealerSum = reduceAce(dealerSum, dealerAces);

    canHit = false;
    document.getElementById("HiddenCard").src = "./cards/" + hidden + ".png";
    document.getElementById("DealerHand").innerHTML = "Dealer Hand: " + dealerSum;
    document.getElementById("PlayerHand").innerHTML = "Player Hand: " + playerSum;

    if (playerSum > 21) {
        document.getElementById("GameResult").innerHTML = "The dealer wins the game!";
        dealerScore += 1;
        document.getElementById("DealerScore").innerHTML = "Dealer Score: " + dealerScore;
    }
    else if (dealerSum > 21 && playerSum < 21) {
        document.getElementById("GameResult").innerHTML = "The player wins the game!";
        playerScore += 1;
        document.getElementById("PlayerScore").innerHTML = "Player Score: " + playerScore;
    }
    else if (dealerSum > playerSum) {
        document.getElementById("GameResult").innerHTML = "The dealer wins the game!";
        dealerScore += 1;
        document.getElementById("DealerScore").innerHTML = "Dealer Score: " + dealerScore;
    }
    else if (playerSum > dealerSum) {
        document.getElementById("GameResult").innerHTML = "The player wins the game!";
        playerScore += 1;
        document.getElementById("PlayerScore").innerHTML = "Player Score: " + playerScore;
    }
    else {
        document.getElementById("GameResult").innerHTML = "The game ends in a tie!";
    }
}

function getValue (card) {
    let cardValuePlace = card.slice(0, 2); // should be A, 1, 5, J, K etc. 
    console.log(cardValuePlace);
    // let cardValue = card.charAt(0);
    if (cardValuePlace[1] === "-") {
        if (isNaN(cardValuePlace[0])) {
            if (cardValuePlace[0] == "A") {
                return 11;
            }
            return 10;
        }
        return parseInt(cardValuePlace[0]);
    }
    if (cardValuePlace[1] !== "-") {
        return 10;
    }
}

function checkIfAce (card) {
    let cardValue = card.charAt(0);
    if (cardValue == "A") {
        return 1;
    }
    return 0;
}

function reduceAce (sum, numberOfAces) {
    while (sum > 21 && numberOfAces > 0) {
        sum -= 10;
        numberOfAces -= 1;
    }
    return sum;
}
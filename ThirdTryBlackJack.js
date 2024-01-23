// This is my third attempt to create a BlackJack Game
// Maybe find out why the canHit flag works?

var hidden;

var canHit = true; 
var nextTurn = false;

var playerScore = 0;
var dealerScore = 0;

var playerSum = 0;
var dealerSum = 0;

var playerAces = 0;
var dealerAces = 0;

var playerHand = [];
var dealerHand = [];

var nextGameBtn = document.getElementById("NewGameButton");
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
}

function startGame () {
    nextGameBtn.disabled = true;
    hidden = cards.pop(); 
    let hiddenCardImg = document.createElement("img");
    hiddenCardImg.src = "./cards/" + "BACK" + ".png";
    hiddenCardImg.setAttribute('id', "HiddenCard"); 
    document.getElementById("DealerHiddenCards").appendChild(hiddenCardImg);
    dealerHand.push(hidden);
    dealerSum += getValue(hidden);
    dealerAces += checkIfAce(hidden);
    while (dealerSum < 17) {
        let dealerCardImg = document.createElement("img"); // <img src="./cards/4-C.png">
        dealerCardImg.setAttribute('id', "dealerCardsFaceup"); // Not sure if this will interfere with creating 
        let dealerCard = cards.pop();                          // new dealer cards
        dealerHand.push(dealerCard);
        console.log(dealerHand); // It seems like it won't remove the first hidden from dealerHand array?
        dealerCardImg.src = "./cards/" + dealerCard + ".png";
        dealerSum += getValue(dealerCard);
        dealerAces += checkIfAce(dealerCard);
        document.getElementById("DealerCardsShow").appendChild(dealerCardImg);
        console.log(document.getElementById("DealerCardsShow").childNodes);
    }
    for (var i = 0; i < 2; i++) {
        let playerCardImg = document.createElement("img");
        let playerCard = cards.pop();
        playerHand.push(playerCard);
        playerCardImg.src = "./cards/" + playerCard + ".png";
        playerSum += getValue(playerCard);
        playerAces += checkIfAce(playerCard);
        document.getElementById("PlayerCardsShow").appendChild(playerCardImg);
    }
    document.getElementById("HitButton").addEventListener("click", hit); // Not sure why these are within the function and 
    document.getElementById("StayButton").addEventListener("click", stay); // not in the global scope?
    nextGameBtn.addEventListener("click", moveNextTurn);
}

function hit () {
    if (!canHit) {
        return;
    }
    let playerCardImg = document.createElement("img");
    let playerCard = cards.pop();
    playerHand.push(playerCard);
    playerCardImg.src = "./cards/" + playerCard + ".png";
    playerSum += getValue(playerCard);
    playerAces += checkIfAce(playerCard);
    document.getElementById("PlayerCardsShow").appendChild(playerCardImg);

    if (reduceAce(playerSum, playerAces) >= 21) { // A, J, K => 21 
        canHit = false;
    }
}

function stay () {
    playerSum = reduceAce(playerSum, playerAces);
    dealerSum = reduceAce(dealerSum, dealerAces);
    document.getElementById("StayButton").disabled = true;
    canHit = false;
    document.getElementById("HiddenCard").src = "./cards/" + hidden + ".png";
    document.getElementById("DealerHand").innerText = "Dealer Hand: " + dealerSum;
    document.getElementById("PlayerHand").innerText = "Player Hand: " + playerSum;

    if (playerSum > 21) {
        document.getElementById("GameResult").innerText = "The dealer wins the game!";
        dealerScore += 1;
        document.getElementById("DealerScore").innerText= "Dealer Score: " + dealerScore;
    }
    else if (dealerSum > 21 && playerSum <= 21) {
        document.getElementById("GameResult").innerText = "The player wins the game!";
        playerScore += 1;
        document.getElementById("PlayerScore").innerText = "Player Score: " + playerScore;
    }
    else if (dealerSum > playerSum) {
        document.getElementById("GameResult").innerText = "The dealer wins the game!";
        dealerScore += 1;
        document.getElementById("DealerScore").innerText = "Dealer Score: " + dealerScore;
    }
    else if (playerSum > dealerSum) {
        document.getElementById("GameResult").innerText = "The player wins the game!";
        playerScore += 1;
        document.getElementById("PlayerScore").innerText = "Player Score: " + playerScore;
    }
    else {
        document.getElementById("GameResult").innerText = "The game ends in a tie!";
    }
    nextTurn = true;
    nextGameBtn.disabled = false;
}

function getValue (card) {
    let cardValuePlace = card.slice(0, 2); // should be A-, 4-, J-, 10, etc.
    if (cardValuePlace[1] === "-") { // should be A, 1, 5, J, K etc. 
        if (isNaN(cardValuePlace[0])) { // Sometimes leads to error when cards run out, Cannot read properties
            if (cardValuePlace[0] === "A") { // of undefined (reading 'slice')
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
    if (cardValue === "A") {
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

function moveNextTurn () {
    let cardsLeft = cards.length;
    if (cardsLeft > 7) {
        playerSum = 0;
        dealerSum = 0;
        playerAces = 0;
        dealerAces = 0;
        canHit = true;
        nextTurn = false;
        document.getElementById("StayButton").disabled = false;
        discardedCards.push(hidden);
        dealerHand.shift(hidden); // This is the line just added to remove hidden card from previous turn from dealer's hand array
        document.getElementById("HiddenCard").remove(); // This is an issue, you need to remove the hidden card after it is flipped
        document.getElementById("DealerHand").innerText = "Dealer Hand:"; // Maybe you can target the parentDiv element and remove it's
        document.getElementById("PlayerHand").innerText = "Player Hand:"; // child nodes?
        document.getElementById("GameResult").innerText = "Game Result";
        let HiddenCard = document.createElement("img");
        HiddenCard.setAttribute('id', "HiddenCard");
        HiddenCard.src = "./cards/BACK.png";
        for (var i = 0; i < dealerHand.length; i++) {
            discardedCards.push(dealerHand[i]);
            dealerHand.pop(dealerHand[i]);
        }
        for (var j = 0; j < playerHand.length; j++) {
            discardedCards.push(playerHand[j]);
            playerHand.pop(playerHand[j]);
        }
        let parentDealerCardsDiv = document.getElementById("DealerCardsShow");
        let dealerUsed = parentDealerCardsDiv.children;
        console.log(dealerUsed); // Remember to check for junk artifacts to see if the 
        while (parentDealerCardsDiv.hasChildNodes()) { // child node element is <img>!
            for (var k = dealerUsed.length - 1; k >= 0; k--) {
                if (dealerUsed[k].nodeName.toLowerCase() === "img") {
                    parentDealerCardsDiv.removeChild(dealerUsed[k]);
                }
            }
            break;
        }
        let parentPlayerCardsDiv = document.getElementById("PlayerCardsShow");
        let playerUsed = parentPlayerCardsDiv.children;
        while (parentPlayerCardsDiv.hasChildNodes()) {
            for (var l = playerUsed.length - 1; l >= 0; l--) {
                if (playerUsed[l].nodeName.toLowerCase() === "img") {
                    parentPlayerCardsDiv.removeChild(playerUsed[l]);
                }
            }
            break;
        }
        }
    startGame();
    if (cardsLeft < 7) {
        window.alert("There are not enough cards left! We will see who the winner is.");
        if (dealerScore > playerScore) {
            document.getElementById("RoundResult").innerText = "The dealer is the winner!";
        }
        else if (playerScore > dealerScore) {
            document.getElementById("RoundResult").innerText = "The player is the winner!";
        }
        else {
            document.getElementById("RoundResult").innerText = "The round ends in a tie!";
        }
        window.alert(document.getElementById("RoundResult").innerText);
        window.alert("Please refresh the screen to start a new game!");
    }
}
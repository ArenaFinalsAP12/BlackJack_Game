// This will be my own attempt to create a BlackJack Game

let hidden; 
let winner; 

let canHit = true; 
let nextTurn = true; 

let playerScore = 0; 
let dealerScore = 0; 

let playerHand = 0; 
let dealerHand = 0;

let playerCards = []; 
let dealerCards = []; 

let cards = ["A-C", "2-C", "3-C", "4-C", "5-C", "6-C", "7-C", "8-C", "9-C", "10-C", "J-C", "Q-C", "K-C", 
"A-D", "2-D", "3-D", "4-D", "5-D", "6-D", "7-D", "8-D", "9-D", "10-D", "J-D", "Q-D", "K-D", 
"A-H", "2-H", "3-H", "4-H", "5-H", "6-H", "7-H", "8-H", "9-H", "10-H", "J-H", "Q-H", "K-H", 
"A-S", "2-S", "3-S", "4-S", "5-S", "6-S", "7-S", "8-S", "9-S", "10-S", "J-S", "Q-S", "K-S"
]; 

startGame(); 

function startGame() { 
    shuffleDeck(cards); 
    startTurn(); 
}

function startTurn() {
    dealCardstoDealer();
    dealCardstoPlayer(); 
}
function shuffleDeck(deck) {
    for(i =0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i]; 
        deck[i] = deck[j]; 
        deck[j] = temp; 
   }
   console.log(deck); 
}

function dealCardstoDealer() {
    let cardImg = document.createElement("img"); 
    hidden = cards.pop(); 
    dealerCards.push(hidden); 
    cardImg.src = "./cards/" + "BACK" + ".png"; 
    document.getElementById("DealerHiddenCards").append(cardImg); 
    dealerCards.forEach(getValue);  
    for(let i = 0; i < 2; i++){
        let cardImg = document.createElement("img"); 
        card = cards.pop();
        dealerCards.push(card);  
        console.log(dealerCards);
        cardImg.src = "./cards/" + card + ".png"; 
        document.getElementById("DealerCardsShow").append(cardImg);
        dealerCards.forEach(getValue); 
        } 
    console.log(`The dealer currently has ${dealerHand}`); 
    }
function dealCardstoPlayer() {
    for (let i = 0; i < 2; i++){
        let cardImg = document.createElement("img"); 
        card = cards.pop(); 
        playerCards.push(card); 
        console.log(playerCards); 
        cardImg.src = "./cards/" + card + ".png"; 
        document.getElementById("PlayerCardsShow").append(cardImg); 
        playerCards.forEach(getValue); 
    }
    console.log(`The player currently has ${playerHand}`); 
}
/*
function hit() {
    if(playerHand < 21) {
        document.getElementById("HitButton").addEventListener("click", addCard);  
        function addCard(playerHand) {
            cards.pop();
            let cardImg = document.createElement("img"); 
            card = cards.pop(); 
            cardImg.src = "./cards/" + card + ".png"; 
            document.getElementById("DealerCardsShow").append(cardImg);
            getValue(card, playerCards);  
        }
    }
    else if(playerHand > 21) {
        canHit = false; 
    }
}

function stay() {
    canHit = false; 
    document.getElementById("StayButton").addEventListener("click", checkWinner); 
}
*/
function getValue(card, hand) {
    for(card in cards) { // two separate functions, one for dealer and one for player?
        let cardrealValue; 
        cardValue = card.split("-"); // Remember that this returns an array 
        cardfirstDigit = cardValue[0]; 
            if(cardfirstDigit == "J" || cardfirstDigit == "Q" || cardfirstDigit == "K") {
                cardrealValue = 10; 
            }
            else if(!cardfirstDigit == "J" || cardfirstDigit == "Q" || cardfirstDigit == "K"){
                cardrealValue = parseInt(cardfirstDigit); 
            }
        hand+= cardrealValue; 
        return hand; 
    }
}
    
function checkIfAce(hand) {
    if(hand > 21) {
        let cardrealValue; 
        cardValue = cardImg.split("-"); 
        if(cardValue[0] == A){
            cardrealValue = 1
        }
        else {
            cardrealValue = 10
        }
    }
}
/*
function checkWinner() {
    canHit = false; 
    if(playerHand > dealerHand && playerHand <= 21){
        playerScore+=1; 
    }
    else if(dealerHand > playerHand){
        dealerScore+=1; 
    }
    else if (dealerHand == playerHand) {
        document.getElementById("GameResult").textContent = "This game ends in a tie!"; 
    }
}
function checkRoundWinner() {
    if(playerScore > dealerScore) {
        winner = 'Player'; 
    }
    else if(dealerScore > playerScore) {
        winner = 'Dealer'; 
    }
    else if(dealerScore == playerScore) {
        winner = 'No one'; 
    }
}
function movetoNextTurn() {
    if(deck.length > 7){
       startGame();  
    }
    else{
        document.getElementById("GameResult").textContent= `The round is over! The winner is ${winner}`
    }
    canHit = true; 
    playerHand = 0; 
    dealerHand = 0; 
}
*/

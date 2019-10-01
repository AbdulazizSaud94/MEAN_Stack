function Card(suit, classVal, numVal) {
    var ninja = {};
    var self = this;
    this.suit = suit;
    this.classVal = classVal;
    this.numVal = numVal;

    this.show = function () {
        console.log(`Card Suit: ${this.suit}, Class: ${this.classVal}, Number: ${this.numVal}`);
    }
}

function Deck(cards){
    this.shuffel = function () {
        console.log(`Shuffel`);
    }
    this.reset = function () {
        console.log(`reset`);
    }
    this.deal = function () {
        console.log(`deal`);
    }
}

function Player(name){
    this.discard = function () {
        console.log(`Discard`);
    }

}
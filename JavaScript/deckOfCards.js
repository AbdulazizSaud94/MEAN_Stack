function Card(suit, numVal) {
    this.suit = suit;
    this.numVal = numVal;

    if (this.numVal == 1) {
        this.classVal = "Ace";
    }
    else if (this.numVal == 2) {
        this.classVal = "Two";
    }
    else if (this.numVal == 3) {
        this.classVal = "Three";
    }
    else if (this.numVal == 4) {
        this.classVal = "Four";
    }
    else if (this.numVal == 5) {
        this.classVal = "Five";
    }
    else if (this.numVal == 6) {
        this.classVal = "Six";
    }
    else if (this.numVal == 7) {
        this.classVal = "Seven";
    }
    else if (this.numVal == 8) {
        this.classVal = "Eight";
    }
    else if (this.numVal == 9) {
        this.classVal = "Nine";
    }
    else if (this.numVal == 10) {
        this.classVal = "Ten";
    }
    else if (this.numVal == 11) {
        this.classVal = "Jack";
    }
    else if (this.numVal == 12) {
        this.classVal = "Queen";
    }
    else if (this.numVal == 13) {
        this.classVal = "King";
    }

    this.show = function () {
        console.log(`Card Suit: ${this.suit}, Class: ${this.classVal}, Number: ${this.numVal}`);
    }
}

class Deck {
    constructor() {
        this._cards = [];

        for (var c = 1; c <= 52; c++) {
            if (c <= 13) {
                this._cards.push(new Card("Hearts", c));
            }
            else if (c <= 26) {
                this._cards.push(new Card("Clubs", c));
            }
            else if (c <= 39) {
                this._cards.push(new Card("Diamonds", c));
            }
            else if (c <= 52) {
                this._cards.push(new Card("Spades", c));
            }
        }
    }

    get cards() {
        return this._cards;
    }

    reset() {
        this._cards = [];
    }

    shuffle() {
        var m = this._cards.length, t, i;
        while (m) {

            i = Math.floor(Math.random() * m--);
            t = this._cards[m];
            this._cards[m] = this.cards[i];
            this._cards[i] = t;
        }
        return this;
    }

    deal() {
        var randNum = Math.floor(Math.random() * this._cards.length);
        var randCard = this._cards[randNum];
        this.cards.splice(randNum, 1);

        return randCard;
    }
}


class Player {
    constructor(name, deck) {
        this.name = name;
        this.hand = [];

        for (var i = 0; i < 5; i++) {
            this.hand.push(deck.deal());
        }
    }

    get hand() {
        return this.hand;
    }

    get name() {
        return this.name;
    }

    take(deck) {
        this.hand.push(this.hand.push(deck.deal()));
    }

    discard(card) {
        var index = this.hand.indexOf(card);
        this.hand.splice(index, 1);
    }
}

deck1 = new Deck();
player1 = ("Abdulaziz", deck1);
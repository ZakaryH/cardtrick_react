import PlayingCard from './PlayingCard';

class Deck {

    static getRandomNumber() {
        return Math.floor( ( Math.random() * 51) + 1 );
    }

    constructor() {
        this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
        this.cards = this._getDeck();
    }

    _getDeck() {
        let cards = [];
        for ( let i = 0; i < this.suits.length; i++) {
            for ( let j = 0; j < this.names.length; j++) {
                cards.push( new PlayingCard ( j+1, this.names[j], this.suits[i] ) );
            }
        }
        cards = this._getPlayingCards(cards);
        cards = this._splitToColumns(cards);
        // return the 21 random cards from deck split into 3 columns
        return cards;

    }

    _getPlayingCards (deck) {
        let activeCards = [];
        // execute this 21 times
        for (let i = 0; i < 21; i++) {

            // generate random numbers until a unique card picked
            do {
                var randomInt = this.constructor.getRandomNumber();
            }
            while ( activeCards.includes(deck[randomInt]) );

            // add unique card to active cards
            activeCards.push(deck[randomInt]);

        }
        return activeCards;
    }

    _splitToColumns (deck) {
        let splitDeck = {
            one: [],
            two: [],
            three: []
        };

        for ( var i=0; i < deck.length; i++) {
            if (i < 7) {
                splitDeck.one.push( deck[i] );
            }
            if (i >=7 && i <= 13) {
                splitDeck.two.push( deck[i] );
            }
            if (i >= 14) {
                splitDeck.three.push( deck[i] );
            }
        }
        return splitDeck;
    }
}

export default Deck;
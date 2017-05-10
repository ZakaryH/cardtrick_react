import React, { Component } from 'react';
import logo from './magic_header.svg';
import Sidebar from './Components/Sidebar/Sidebar';
import PlayArea from './Components/PlayArea/PlayArea';
import Deck from './Components/Deck/Deck';

import './App.css';

class App extends Component {
    //here we now have 21 random cards in 3 columns
    constructor(props) {
        super(props);
        this.state = {
            cards: new Deck()
        }
    }


    // set the column cards in correct order and then concatenate the resultsss
    shuffleCards (selectedCol) {
        let middleCol = [];
        let outerCol1 = [];
        let outerCol2 = [];
        middleCol = selectedCol.props.cards;
        // go thru the 3 columns
        for ( let key in this.state.cards.cards ) {
            if (this.state.cards.cards.hasOwnProperty(key)) {
                if (key !== selectedCol.props.colName){
                    // set the outer colums to temp arrays
                    // TODO - randomize the shuffle order a bit more?
                    //logic here is getting bunged upff
                    if (outerCol1.length === 0) {
                        outerCol1 = this.state.cards.cards[key];

                    } else {
                        outerCol2 = this.state.cards.cards[key];
                    }
                }
            }
        }
        // combine the temp arrays into one big one
        // apply redistribution procedure on the concat'd cards
        this.redistribute(outerCol1.concat(middleCol, outerCol2));

    }
    // using all the active cards, make new column array
    // functional shuffling procedure AKA laying out the cards IRL
    redistribute (allPlayingCards) {
        let outcomes = [0,1,2];
        let returnDeck = {};

        outcomes.forEach( function(val) {
            returnDeck[val] = allPlayingCards.filter( (card, index) => {
                return index % 3 === val;
            })
        });
        this.setState({
            cards: {
                cards: {
                    one: returnDeck[0],
                    two: returnDeck[1],
                    three: returnDeck[2],
                }
            }
        });
    }

    startNewGame() {
        this.setState({
            cards: new Deck()
        });
    }

  //make a deck here, and maange the game, pass everything to the playarea
  //  or handle the deck in the play area, the sidebar doesn't need access to it really
  //fdd vv
  //  makes more sense to control the games/sessions from here, initialize etc.
  //  have access to the main pieces like the deck as this component for an entry point
  render() {
    return (
      <div className="App row">
        <div className="App-header col-md-12">
            <div className="App-logo"></div>
          {/*<img src={logo} className="App-logo svg" alt="logo" />*/}
        </div>
        <div className="col-md-4">
          <Sidebar />
        </div>
        <div className="play-area col-md-8">
          <PlayArea
              columns={this.state.cards.cards}
              shuffleCards={this.shuffleCards.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;

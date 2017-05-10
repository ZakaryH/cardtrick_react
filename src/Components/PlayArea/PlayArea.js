import React, { Component } from 'react';
import CardColumn from '../CardColumn/CardColumn';
import './PlayArea.css';


class PlayArea extends Component {
    constructor(props) {
        super(props);
        //so maybe keep the state in here, have the column be stateless
        this.state = {
            iterations: 0,
            gameOver: false,
            columns: [
                {
                    name: "one",
                    middle: false,
                    cards: [
                    ]
                },
                {
                    name: "two",
                    middle: false,
                    cards: [
                    ]
                },
                {
                    name: "three",
                    middle: false,
                    cards:[
                    ]
                }
            ],
            shuffling: false
        }
    }
    handleColumnSelection(column) {
        if (this.state.iterations < 2) {
            //pass column to parent function
            this.props.shuffleCards(column);

            this.setState({
                iterations: this.state.iterations + 1,
                shuffling: true
            }, function () {
                this.doStuff(this);
            });
        } else {
            this.endSession(column);
        }
    }
    //TODO look at implementing arrow function for lexical this, replacing the context param
    doStuff(context) {
        this.stackCards();
        setTimeout( function () {
            context.spreadCards();
            context.setState({
                shuffling: false
            });
        }, 1300);

    }

    endSession(column) {
        this.setState({
            gameOver: true,
            chosenCard: column.props.cards[3]
        });
    }

    beginSession() {
        this.setState({
            iterations: 0,
            gameOver: false
        });
    }

    //TODO these two functions could be merged, making the callback a variable
    // visually move all the cards into a pile at the top
    stackCards() {
        let columns = [];
        columns.push(document.getElementById("col-1"));
        columns.push(document.getElementById("col-2"));
        columns.push(document.getElementById("col-3"));
        // apply and remove classes associated with css animations
        columns.forEach(function(column) {
            column.querySelectorAll('.Card').forEach(function(card, index) {
                card.classList.remove("spread-" + (index + 1));
                setTimeout( function () {
                    card.classList.add("stack-" + (index + 1))
                }, index * 30)
            });
        });
    }

    // visually move all teh cards from the pile into columns
    // also randomly skew cards a bit
    spreadCards () {
        let columns = [];
        columns.push(document.getElementById("col-1"));
        columns.push(document.getElementById("col-2"));
        columns.push(document.getElementById("col-3"));

        columns.forEach(function(column){
            column.querySelectorAll('.Card').forEach(function(card, index) {
                let a = Math.random() * 10 -5;

                card.style.transform = 'rotate3d(0, 0, 1, '+ a +'deg)';

                setTimeout( function () {
                    card.classList.remove("stack-" + (index + 1));
                    card.classList.add("spread-" + (index + 1))
                }, index * 125)
            });
        });
    }
    removeCard(card) {
        // let newValues = this.props.cardValues.find( x => x === card);
    }


    render() {
        let columns = [];
        let counter = 1;

        for ( let key in this.props.columns) {
            if(this.props.columns.hasOwnProperty(key)){
                columns.push(
                    <CardColumn
                        key={key}
                        index={counter}
                        colVal={counter}
                        colName={key}
                        cards={this.props.columns[key]}
                        shuffling={this.state.shuffling}
                        selectColumn={this.handleColumnSelection.bind(this)}/>
                );
                counter++;
            }
        }
        if(!this.state.gameOver) {
            return (
                <section className="PlayArea row">
                    {columns}
                </section>
            )
        }
        return (
            <div className="text-center">
                <div className="reveal-container">
                    <div className="fade-1 reveal-name">{this.state.chosenCard.name}</div>
                    <div className="fade-2 reveal-of">of</div>
                    <div className={"fade-3 reveal-suit " + this.state.chosenCard.suit}>{this.state.chosenCard.suit}</div>
                </div>
                <button className="btn btn-primary fade-4" onClick={this.beginSession.bind(this)}>Play Again</button>
            </div>
        )
    }
}

PlayArea.defaultProps = {
    //middle needs to be a state so it can change as needed, same as iterations
    //chosen card is only revealed at the end, and gets reest
    order: ["one", "two", "three"],
    iterations: '',
    chosenCard: ''
};

export default PlayArea;

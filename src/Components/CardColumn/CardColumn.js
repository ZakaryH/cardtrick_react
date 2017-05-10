import React, { Component } from 'react';
import Card from '../Card/Card';
import './CardColumn.css';

class CardColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            middle: false
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    selectColumn() {
        //pass the column back to the parent function
        this.props.selectColumn(this);

    }

  render() {
    let cards;

    cards = this.props.cards.map( (card, i) => {
        // console.log(`value: ${card.value} suit: ${card.suit}`);
      return (
          <div
              className={"col-xs-12 text-center column-" + this.props.colVal + "-row-" + (i + 1)}
              id={"col-" + this.props.colVal + "-row-" + (i +1)}
              key={card.value + card.suit}>
            <Card
                index={card.value}
                value={card.value}
                suit={card.suit}
                name={card.name} />
          </div>
        )
    });
    return (
      <section className="CardColumn col-xs-4" id={"col-" + this.props.index}>
          <div className="row">
                  {cards}
                  <button
                      className="btn card-btn"
                      disabled={this.props.shuffling}
                      onClick={this.selectColumn.bind(this)}>
                      Press Me
                  </button>
          </div>
      </section>
    )
  }
}

CardColumn.defaultProps = {
    middle: false
};

export default CardColumn;

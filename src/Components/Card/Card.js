import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    render() {
        return (
            <div className={ 'Card ' + this.props.suit}>
                <i className="absolute-centered">{this.props.name}</i>
            </div>
        )
    }
}

Card.defaultProps = {
    value: '',
    name: '',
    suit: '',
};

export default Card;

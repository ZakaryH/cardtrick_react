import React, { Component } from 'react';
import "./Sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <section className="Sidebar">
        <h3>Instructions</h3>
        <ul className="instructions">
          <li>In your head (or out loud) <b>pick one card</b> from any of the columns</li>
          <li><b>Remember</b> your chosen card</li>
          <li>Click the <b>button at the bottom</b> of whichever column your card is in</li>
          <li>Find your card again and <b>repeat the previous step</b></li>
        </ul>
      </section>
    )
  }
}

export default Sidebar;

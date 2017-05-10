import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.cardValues = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
    ];

    this.state = {
      name: "Barry"
    };
  } 
  componentWillMount() {
  }
  componentDidMount() {
  }
  testingStuff(e) {
    e.preventDefault();
  }

  handleSubmission(e) {
    console.log("hello");
    e.preventDefault();
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    })
  }


  render() {
    return (
      <section className="Form">
        <h3>{this.state.name}'s Application</h3>
        <form onSubmit={this.handleSubmission.bind(this)}>
          <input type="text" value={this.state.name} onChange={this.updateName.bind(this)} ref="name"/>
          <input type="submit" value="Submit"/>
        </form>
      </section>
    );
  }
}

export default Form;

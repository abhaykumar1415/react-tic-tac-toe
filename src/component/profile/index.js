import React, { Component } from 'react'
import './profile.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  getUserName = () => {
    let email = this.props.history.location.state.email;
    console.log(email);
    let words = email.split('@');
    console.log(words);
    console.log(words[0]);
    let name = words[0];
    console.log('name', name);
    this.setState({ text: name });
    console.log('text', this.state.text);
  }
  render() {

    return (
      <div className="profile-wrapper">
        {this.props.history.location.state.email}
        <button onClick={this.getUserName}> submit </button>
        {this.state.text}
      </div >
    )
  }
}

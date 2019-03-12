import React, { Component } from 'react'

let details = JSON.parse(window.localStorage.getItem('Received Player'));
export default class Invitation extends Component {

  render() {
    console.log('values from localstorage :', details);
    return (
      <div>
        hi
      </div>
    )
  }
}

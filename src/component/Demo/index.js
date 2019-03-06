import React, { Component } from 'react'
import { askForPermissioToReceiveNotifications } from '../../push-notification';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <button onClick={askForPermissioToReceiveNotifications}>
          Allow
        </button>
        {/* <button onClick={postData}>
          Notify
        </button> */}
      </div>
    )
  }
}

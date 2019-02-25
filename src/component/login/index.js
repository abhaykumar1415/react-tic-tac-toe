import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import './login.css';
import firebase from '../services/firebase.js'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Handler from '../services/userOperation';


let database = firebase.database().ref();
let userNode = database.child('users');
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      open: false,
      loginState: ''
    }
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ email: event.target.value });
    console.log(event.target.value);
  };


  handelSubmit = (event) => {

    this.setState({ open: false, loginState: '' });
    if ((this.state.email === '') && (this.state.password === '')) {
      this.setState({ open: true, loginState: 'Fields are empty' });

    } else {
      Handler.userLogin(this.state.email, this.state.password)
        .then(res => {
          console.log('res :', res);
          Handler.getCurrentUser(this.state.email);
          this.setState({ opne: res.success, loginState: "Login Successfully" });
        }).catch(err => {
          console.log("value", err);
          this.setState({ opne: err.success, loginState: err.result.message });
        });
    }
  }

  handleText = (e) => {
    this.setState({ password: e.target.value });
    console.log(e.target.value);
  }

  handelFunction = () => {
    this.handelSubmit();
    this.handleClick();
  }

  render() {
    return (
      <div className="login-wrapper" >
        <div className="login-content">
          <div className="login-input">
            <FormControl variant="outlined">
              <OutlinedInput
                id="component-outlined"
                name='name'
                placeholder="User Name"
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
              />
            </FormControl>
          </div>
          <div className="login-password">
            <FormControl variant="outlined">

              <OutlinedInput
                id="component-outlined"
                name='password'
                type='password'
                value={this.state.password}
                placeholder='Password'
                onChange={this.handleText}

                fullWidth
                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
              />
            </FormControl>
          </div>
        </div>


        <div className="login-button">
          <Button variant="contained" color="primary" fullWidth onClick={this.handelFunction}  >
            Login
        </Button>
        </div>

        <div>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.loginState}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"

                onClick={this.handleClose}
              >
                <i className="material-icons">
                  clear
                </i>
              </IconButton>,
            ]}
          />
        </div>

        {/* <div>
         
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.loginState}</span>}
            action={[
              //   <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              //     UNDO
              // </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"

                onClick={this.handleClose}
              >
                <i className="material-icons">
                  clear
                </i>
              </IconButton>,
            ]}
          />
        </div> */}


      </div >
    )
  }
}

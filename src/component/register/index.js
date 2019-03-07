import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import './register.css';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Handler from '../services/authService.js';
import firebase from '../services/firebase';
import TextField from '@material-ui/core/TextField';
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginState: '',
      loggedIn: false
    }
  }

  componentDidMount() {
    this.authListener();
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

  validateEmail = (email) => {
    console.log(email);
    var regx = /^[a-z0-9](\.?[a-z0-9]){5,}@qed42\.com$/;
    return regx.test(email);
    console.log(" ", regx.test(email));
  }

  handelRegister = (event) => {
    this.validateEmail(this.state.email);
    this.setState({ open: false, loginState: '' });
    if ((this.state.email === '') && (this.state.password === '')) {
      this.setState({ open: true, loginState: 'Fields are empty' });

    } else {
      Handler.registerUser(event, this.state.email, this.state.password)
        .then(res => {
          console.log('res :', res);
          this.setState({ open: res.success, loginState: "Registered Successfully" });
          this.props.history.push({
            pathname: '/login'
          });
        }).catch(err => {
          console.log("value", err.result.message);
          this.setState({ open: err.success, loginState: err.result.message });
        });
    }
  }

  handleText = (e) => {
    this.setState({ password: e.target.value });
    console.log(e.target.value);
  }

  handelFunction = () => {
    this.handelRegister();
    this.handleClick();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("user:", user.email);
        this.setState({
          loggedIn: true
        })
      } else {
        // No user is signed in.
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  render() {
    return (
      <div>
        {/* {this.state.loggedIn === true ? (this.props.history.push('/login')) : */}
        <div className="login-wrapper">
          <div className="login-content">
            <div className="login-input">
              <FormControl variant="outlined">
                {/* <OutlinedInput
                id="component-outlined"
                name="name"
                placeholder="User Name"
                value={this.state.name}
                pattern='^[a-z0-9](\.?[a-z0-9]){5,}@qed42\.com$ '
                onChange={this.handleChange}
                fullWidth
                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
              /> */}
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  name="email"

                  value={this.state.name}
                  onChange={this.handleChange}
                  emailpattern="^[a-z0-9](\.?[a-z0-9]){5,}@qed42\.com$"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
              </FormControl>
            </div>
            <div className="login-password">
              <FormControl variant="outlined">
                {/* <OutlinedInput
                id="component-outlined"
                name="password"
                type="password"
                value={this.state.name}
                placeholder='Password'
                onChange={this.handleText}
                fullWidth
                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
              /> */}
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  value={this.state.name}
                  placeholder='Password'
                  onChange={this.handleText}
                  fullWidth
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                />
              </FormControl>
            </div>
          </div>
          <div className="login-button">
            <Button variant="contained" color="primary" fullWidth onClick={this.handelFunction}>
              Sign Up
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
        </div>
      </div>
    )
  }
}

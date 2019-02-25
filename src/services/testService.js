const globalState = {
  isLoggedIn: false,
  cart: [],
  userData: []
}

getLoggedInStatus = () => {
  return this.isLoggedIn;
}

getCart = () => {
  return this.cart;
}

getUserData = () => {
  return this.userData;
}

setLoggedInStatus = (status) => {
  this.isLoggedIn = status;
}
setCart = (cart) => {
  this.cart = cart;
}
setUserData = (userData) => {
  return this.userData = userData;
}

const State = {
  getLoggedInStatus,
  getCart,
  getUserData,
  setLoggedInStatus,
  setCart,
  setUserData
}

export default State;
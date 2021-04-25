import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Header from "./components/header/Header"
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInSignUp from './pages/SignInSignUp/SignInSignUp';
import { auth, createUserProfileDocument } from "./firebase/utils";
import { connect } from "react-redux"
import { setCurrentUser } from "./redux/user/actions"
import { selectCurrentUser } from './redux/user/selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/Checkout';
import { selectCartItems } from './redux/cart/selectors';
class App extends Component {
  
  unsubscribeFromAuth = null;
  componentDidMount(){
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot => {
        setCurrentUser({ 
            id: snapShot.id,
            ...snapShot.data()
        })
      })
    }else{
      setCurrentUser(userAuth)
    }
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' render={() => <CheckoutPage {...this.props.cartItem} />} />
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUp />) } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItem: selectCartItems
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
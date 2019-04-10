import React, { Component } from 'react';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCy1cbpbiXSxNzpCkPSd_otBd9m6zLN2eg",
    authDomain: "fire-base-login-c4ad6.firebaseapp.com",
    databaseURL: "https://fire-base-login-c4ad6.firebaseio.com",
    projectId: "fire-base-login-c4ad6",
    storageBucket: "fire-base-login-c4ad6.appspot.com",
    messagingSenderId: "731047924459"
  };
  firebase.initializeApp(config);

class Authen extends Component {

  login () {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(result =>{
      let lout = document.getElementById('logout')
      let err = "Welcome "+ result.user.email;
      lout.classList.remove('hide')
      this.setState({err: err});
    })

    promise.catch(e => {
      let err = e.message;
      console.log(err)
      this.setState({err: err})
    })
  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user =>{
      let err = "Welcome "+ user.user.email;
      firebase.database().ref('users/'+user.user.uid).set({
        email: user.user.email
      })
      console.log(user)
      this.setState({err: err})
    })
    .catch(e => {
      var err = e.message;
      console.log(err)
      this.setState({err: err})
    })
  }

  logout (){
    firebase.auth().signOut();
    let lout = document.getElementById('logout')
    let err = "Thank you for visiting!"
    lout.classList.add('hide')
    this.setState({err: err})
  }

  google(){
    console.log("I am in google method!")

    let provider = new firebase.auth.GoogleAuthProvider();
    let promise = firebase.auth().signInWithPopup(provider);
    promise.
    then(result => {
      let user = result.user;
      console.log(result.user)
      firebase.database().ref('users/'+ user.uid).set({
        email: user.email,
        name: user.displayName
      })
    })
    promise.catch(e => {
      let msg = e.message;
      console.log(msg)
    })
  }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }
  render() {
    return (
      <div>
        <input type="email" placeholder="Enter your email" id="email" ref="email"/><br/>
        <input type="password" placeholder="Enter your password" id="pass" ref="password"/><br/>
        <p>{this.state.err}</p>

        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">Log Out</button><br/>
        <button onClick={this.google} id="google" className="google">Sign in with Google</button>
      </div>
    );
  }

}

export default Authen;

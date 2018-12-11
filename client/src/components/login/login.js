import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginApp } from '../../actions'
import Input from '../input';
import worm from '../../assets/images/bookworm.png'
import './login.css';


class Login extends Component {
   handleLogin = async (values) => {
      await this.props.loginApp(values)
      await this.pushToHome()
   }
   pushToHome = () => {
      const { auth } = this.props
      if (auth) {
         this.props.history.push('/home')
      }
   }
   render() {
      const { handleSubmit, signInError } = this.props
      return (
         <div className="login-background container-fluid">
            <div className="login-padding">
               <img src={worm} className="worm-image" />
               <h1 className="login-title">Book Worms</h1>
            </div>
            <form className="login-form-container row" onSubmit={handleSubmit(this.handleLogin)}>
               <div className="login-input-padding ">
                  <Field name="email" label="E-mail" component={Input} inputClassName="user-input col-8" labelClassName="label-login-color" />
               </div>
               <div className="login-input-padding ">
                  <Field name="password" label="Password" component={Input} type="password" inputClassName="user-input col-8" labelClassName="label-login-color"/>
               </div>
               <button className="btn sign-in-button">Sign In</button>
               <p>{signInError}</p>
            </form>
            <div className="create-account-container">
               <Link to='/create-account' className="create-button" >Create Account</Link>
            </div>
         </div>
      )
   }
}

function validate({ email, password }) {
   const error = {};
   if (!email) {
      error.email = 'Please enter your email'
   }
   if (!password) {
      error.password = 'Please enter your password'
   }
   return error
}

function mapStateToProps(state) {
   return {
      signInError: state.login.signInError,
      auth: state.login.auth
   }
}

Login = reduxForm({
   form: 'login',
   validate: validate
})(Login);

export default connect(mapStateToProps, {
   loginApp: loginApp,
})(Login);

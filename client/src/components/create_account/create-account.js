import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createAccount } from '../../actions';
import { loginApp } from '../../actions';
import Input from '../input';
import worm from '../../assets/images/bookworm.png';
import './create-account.css'

class CreateNewAccount extends Component {
   handleCreateAccount = async (values) => {
      await this.props.createAccount(values);
      await this.pushToHome()
   }
   pushToHome = () => {
      const { account } = this.props
      if (account) {
         this.props.history.push('/home')
      }
   }
   loginNewAccount = (values) => {
      const { account } = this.props
      if (account) {
         this.props.loginApp(values)
      }
   }
   render() {
      const { handleSubmit, invalidEmail, invalidUsername } = this.props
      return (
         <div>
            <div className='create-account-header-container container-fluid '>
               <img className='header-worm nav-logo' src={worm} />
               <span className='navbar-text'>Book Worms</span>
            </div>
            <h1 className='create-account-header'>CREATE ACCOUNT</h1>
            <form className="account-details-container" onSubmit={handleSubmit(this.handleCreateAccount)}>
               <div className="create-account-input-padding">
                  <Field name="firstname" label="First Name" component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
               </div>
               <div className="create-account-input-padding">
                  <Field name="lastname" label="Last Name" component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
               </div>
               <div className="create-account-input-padding">
                  <Field name="username" label="Username" component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
               </div>
               <p className="create-account-error">{invalidUsername}</p>
               <div className="create-account-input-padding">
                  <Field name="email" label="E-mail" component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
               </div>
               <p className="create-account-error">{invalidEmail}</p>
               <div className="create-account-input-padding">
                  <Field name="password" label="Password" component={Input} type="password" inputClassName="create-account-user-input" errorClassName="create-account-error" />
               </div>
               <div className="create-account-input-padding">
                  <Field name="confirmPassword" label="Confirm Password" component={Input} type="password" inputClassName="create-account-user-input" errorClassName="create-account-error" />
               </div>
               <button className='btn create-account-button'>Create Account</button>
            </form>
         </div>
      )
   }
}

function validate({ firstname, lastname, username, email, password, confirmPassword }) {
   const error = {};
   const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const validName = /^[a-z ,.'-]+$/i
   if (!firstname) {
      error.firstname = "Please enter your first name"
   }
   if (!validName.test(firstname)) {
      error.firstname = "Please enter a valid first name"
   }
   if (!lastname) {
      error.lastname = "Please enter your last name"
   }
   if (!validName.test(lastname)) {
      error.lastname = "Please enter a valid last name"
   }
   if (!username) {
      error.username = "Please enter a username"
   }
   if (!validEmail.test(email) || !email) {
      error.email = "Please enter a valid email"
   }
   if (!password) {
      error.password = "Please enter a password"
   }
   if (confirmPassword !== password) {
      error.confirmPassword = "Your passwords do not match"
   }
   return error
}

function mapStateToProps(state) {
   return {
      invalidEmail: state.createAccount.validEmail,
      invalidUsername: state.createAccount.validUsername,
      account: state.createAccount.account
   }
}

CreateNewAccount = reduxForm({
   form: 'create-account',
   validate: validate
})(CreateNewAccount);

export default connect(mapStateToProps, {
   createAccount: createAccount,
   loginApp: loginApp,
})(CreateNewAccount)
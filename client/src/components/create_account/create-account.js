import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createAccount } from '../../actions';
import { loginApp } from '../../actions';
import Input from '../input';
import worm from '../../assets/images/bookworm.png';
import './create-account.css'
import {Link} from 'react-router-dom'
import arrow from '../../assets/images/back-arrow.png';

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
               <Link className='create-main-title' to='/'>
                  <img className='create-account-header-worm nav-logo' src={worm} />
                  <span className='create-account-navbar-text'>Book Worms</span>
               </Link>
            </div>

            <main className='account-content container'>
               <div className='profile-header row justify-content-center align-items-center'>
                  <Link to='/' className='create-return'>
                     <img className='create-account-return return-button' src={arrow} />
                     <span>Back</span>
                  </Link>
                  <p className='create-account-header col-10'>CREATE ACCOUNT</p>
               </div> 
               <form className="account-form row" onSubmit={handleSubmit(this.handleCreateAccount)}>
                  <div className="create-account-input-padding col-8">
                     <Field name="firstname" label="First Name" maxLength='30' component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div className="create-account-input-padding col-8">
                     <Field name="lastname" label="Last Name" maxLength='30' component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div className="create-account-input-padding col-8">
                     <Field name="username" label="Username" maxLength='25' component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <p className="create-account-error">{invalidUsername}</p>
                  <div className="create-account-input-padding col-8">
                     <Field name="email" label="E-mail" maxLength='40' component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <p className="create-account-error">{invalidEmail}</p>
                  <div className="create-account-input-padding col-8">
                     <Field name="password" label="Password" maxLength='30' component={Input} type="password" inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div className="create-account-input-padding col-8">
                     <Field name="confirmPassword" label="Confirm Password" maxLength='30' component={Input} type="password" inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div className='account-confirm col-5'>
                     <button className='btn create-account-button'>CONFIRM</button>
                  </div>
               </form>
            </main>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createAccount } from '../../actions';
import { loginApp } from '../../actions';
import Input from '../input';
import worm from '../../assets/images/bookworm.png'

class CreateNewAccount extends Component {
   handleAddItem = async (values) => {
      await this.props.createAccount(values);
      await this.props.loginApp(values);
      this.props.history.push('/home');
   }
   render() {
      const { handleSubmit } = this.props
      return (
         <div>
            <form onSubmit={handleSubmit(this.handleAddItem)}>
               <div>
                  <Field name="firstname" label="First Name" component={Input} />
               </div>
               <div>
                  <Field name="lastname" label="Last Name" component={Input} />
               </div>
               <div>
                  <Field name="username" label="Username" component={Input} />
               </div>
               <div>
                  <Field name="email" label="E-mail" component={Input} />
               </div>
               <div>
                  <Field name="password" label="Password" component={Input} type="password" />
               </div>
               <div>
                  <Field name="confirmPassword" label="Confirm Password" component={Input} type="password" />
               </div>
               <button>Create Account</button>
            </form>
         </div>
      )
   }
}

function validate({ firstname, lastname, username, email, password, confirmPassword }) {
   const error = {};
   if (!firstname) {
      error.firstname = "Please enter your first name"
   }
   if (!lastname) {
      error.lastname = "Please enter your last name"
   }
   if (!username) {
      error.username = "Please enter a username"
   }
   if (!email) {
      error.email = "Please enter your email"
   }
   if (!password) {
      error.password = "Please enter a password"
   }
   if (confirmPassword !== password) {
      error.confirmPassword = "Your passwords do not match"
   }
   return error
}


CreateNewAccount = reduxForm({
   form: 'create-account',
   validate: validate
})(CreateNewAccount);

export default connect(null, {
   createAccount: createAccount,
   loginApp: loginApp,
})(CreateNewAccount)
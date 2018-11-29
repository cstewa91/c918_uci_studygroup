import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createAccount } from '../../actions';
import { loginApp } from '../../actions';
import worm from '../../assets/images/bookworm.png'

class CreateNewAccount extends Component {
   renderInput(props) {
      const { input, label, meta: { touched, error } } = props
      console.log(props)
      return (
         <div>
            <input {...input} type="text" />
            <label>{label}</label>
            <p>{touched && error}</p>
         </div>
      )
   }
   handleAddItem = async (values) => {
      await this.props.createAccount(values);
      await this.props.loginApp(values)
      this.props.history.push('/home')
   }
   render() {
      const { handleSubmit } = this.props
      return (
         <div>
            <form onSubmit={handleSubmit(this.handleAddItem)}>
               <div>
                  <Field name="firstname" label="First Name" component={this.renderInput} />
               </div>
               <div>
                  <Field name="lastname" label="Last Name" component={this.renderInput} />
               </div>
               <div>
                  <Field name="username" label="Username" component={this.renderInput} />
               </div>
               <div>
                  <Field name="email" label="E-mail" component={this.renderInput} />
               </div>
               <div>
                  <Field name="password" label="Password" component={this.renderInput} />
               </div>
               {/* <div>
                  <Field name="retypePassword" label="Retype Password" component={this.renderInput} />
               </div> */}
               <div>
                  <Field name="google_id" label="Google ID" component={this.renderInput} />
               </div>
               <button>Create Account</button>
            </form>
         </div>
      )
   }
}

function validate({ firstname, lastname, username, email, password, google_id }) {
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
   // if (retypePassword !== password) {
   //    error.retypePassword = "Your passwords do not match"
   // }
   if (!google_id) {
      error.google_id = "Please enter a google id"
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
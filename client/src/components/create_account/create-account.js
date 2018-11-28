import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createAccount } from '../../actions'
import worm from '../../assets/images/bookworm.png'

class CreateNewAccount extends Component {
   renderInput(props) {
      const { input, label, meta: { touched, error } } = props
      return (
         <div>
            <input {...input} type="text" />
            <label>{label}</label>
         </div>
      )
   }
   handleAddItem = async (values) => {
      await this.props.createAccount(values);
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
               <div>
                  <Field name="google_id" label="Google ID" component={this.renderInput} />
               </div>
               <button>Create Account</button>
            </form>
         </div>
      )
   }
}

CreateNewAccount = reduxForm({
   form: 'create-account'
})(CreateNewAccount);

export default connect(null,{
   createAccount: createAccount
})(CreateNewAccount)
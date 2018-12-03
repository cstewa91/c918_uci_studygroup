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
      const { user } = this.props
      if (user) {
         this.props.history.push('/home')
      }
   }
   render() {
      const { handleSubmit, signInError } = this.props
      return (
         <div>
            <div>
               <img src={worm} className="worm" />
            </div>
            <h1>Book Worms</h1>
            <h1>Google Sign In</h1>
            <form onSubmit={handleSubmit(this.handleLogin)}>
               <div>
                  <Field name="email" label="E-mail" component={Input} />
               </div>
               <div>
                  <Field name="password" label="Password" component={Input} type="password" />
               </div>
               <button>Login</button>
               <p>{signInError}</p>
            </form>
            <Link to='/create-account'>create account</Link>
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
      user: state.login.user
   }
}

Login = reduxForm({
   form: 'login',
   validate: validate
})(Login);

export default connect(mapStateToProps, {
   loginApp: loginApp,
})(Login);
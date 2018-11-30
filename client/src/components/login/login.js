import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginApp } from '../../actions'
import worm from '../../assets/images/bookworm.png'
import './login.css';


class Login extends Component {
   renderInput(props) {
      const { input, label, meta: { touched, error } } = props
      if (props.input.name === "email") {
         return (
            <div>
               <input  {...input} type="text" />
               <label>{label}</label>
               <p>{touched && error}</p>
            </div>
         )
      } else {
         return (
            <div>
               <input  {...input} type="password" />
               <label>{label}</label>
               <p>{touched && error}</p>
            </div>
         )
      }
   }

   handleAddItem = async (values) => {
      await this.props.loginApp(values)
      this.validLogin();
   }
   validLogin = () => {
      const { user } = this.props
      if (user === "valid") {
         this.props.history.push('/home')
      }
   }
   invalidLogin = () => {
      const { user } = this.props
      if (user === "invalid") {
         return "Invalid Email or Password"
      }
   }
   render() {
      const { handleSubmit } = this.props
      return (
         <div>
            <div>
               <img src={worm} className="worm" />
            </div>
            <h1>Book Worms</h1>
            <h1>Google Sign In</h1>
            <form onSubmit={handleSubmit(this.handleAddItem)}>
               <div>
                  <Field name="email" label="E-mail" component={this.renderInput} />
               </div>
               <div>
                  <Field name="password" label="Password" component={this.renderInput} />
               </div>
               <button>Login</button>
               <p>{this.invalidLogin()}</p>
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
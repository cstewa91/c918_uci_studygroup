import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import worm from '../../assets/images/bookworm.png'
import './login.css';


class Login extends Component {
   // renderInput() {
   //    console.log('hello')
   // }
   render() {
      return (
         <div>
            <div>
               <img src={worm} className="worm" />
            </div>
            <h1>Book Worms</h1>
            <h1>Google Sign In</h1>
            {/* <form>
               <div>
                  <Field name="email" label="E-mail" component={this.renderInput} />
               </div>
               <div>
                  <Field name="password" label="Password" component={this.renderInput} />
               </div>
            </form> */}
         </div>
      )
   }
}

// Login = reduxForm({
//    form: 'login'
// })(Login)

export default Login
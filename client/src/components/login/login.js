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
      return (
         <div>
            <input  {...input} type="text" />
            <label>{label}</label>
         </div>
      )
   }
   handleAddItem = async (values) => {
      await this.props.loginApp(values);
      this.props.history.push('/home')
   }
   render() {
      const { handleSubmit } = this.props
      if (this.props.userId) {
         const userIdNumber = (this.props.userId[0].username)
      }
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
            </form>
            <Link to='/create-account'>create account</Link>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      userId: state.login.user
   }
}

Login = reduxForm({
   form: 'login'
})(Login);

export default connect(mapStateToProps, {
   loginApp: loginApp,
})(Login);
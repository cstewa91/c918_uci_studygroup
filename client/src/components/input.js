import React, { Component } from 'react'
import './login/login.css'

class Input extends Component {
   state = {
      activeField: false

   }
   landInputLabel = (event) => {
      if (event.target.value === "") {
         this.setState({
            activeField: false,
         })
      }
   }
   floatInputLabel = () => {
      this.setState({
         activeField: true
      });
   }
   render() {
      const { input, label, className = 'user-input', meta: { error, touched }, size, type = 'text' } = this.props
      let floatText = ""
      if (this.state.activeField) {
         floatText = "field-active"
      }
      return (
         <div>
            <label htmlFor={input.name} className={floatText}>{label}</label>
            <input {...input} type={type} id={input.name} label={label} className={className} onFocus={this.floatInputLabel} onBlur={this.landInputLabel} />
            <p>{touched && error}</p>
         </div>
      )
   }
}

export default Input




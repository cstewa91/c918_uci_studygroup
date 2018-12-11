import React, { Component } from 'react'
import './login/login.css'

class Input extends Component {
   state = {
      activeField: false

   }
   componentDidMount = () => {
      if (this.props.input.value) {
         this.setState({
            activeField: true,
         })
      }
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
      const { input, label, inputClassName, labelClassName, meta: { error, touched }, size, type = 'text' } = this.props
      let floatText = labelClassName
      if (this.state.activeField) {
         floatText = `field-active ${labelClassName}`
      }
      return (
         <div>
            <label htmlFor={input.name} className={floatText}>{label}</label>
            <input {...input} type={type} id={input.name} label={label} size={size} className={inputClassName} onFocus={this.floatInputLabel} onBlur={this.landInputLabel} autoComplete="off" />
            <p className="login-error">{touched && error}</p>
         </div>
      )
   }
}

export default Input

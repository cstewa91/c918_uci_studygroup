import React, { Component } from 'react'
import '../assets/css/input.css'

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
      const { input, label, inputClassName, labelClassName, errorClassName, loginActive, meta: { error, touched }, size, type = 'text', textArea, textAreaClassName, maxLength, min } = this.props
      let floatText = labelClassName
      if (this.state.activeField && !loginActive) {
         floatText = `field-active ${labelClassName}`
      }
      if (this.state.activeField && loginActive) {
         floatText = `${loginActive} ${labelClassName}`
      }
      if (!textArea) {
         return (
            <div>
               <label htmlFor={input.name} className={floatText}>{label}</label>
               <input {...input} type={type} id={input.name} label={label} size={size} className={inputClassName} min={min} maxLength={maxLength} onFocus={this.floatInputLabel} onBlur={this.landInputLabel} autoComplete="off" />
               <p className={errorClassName}>{touched && error}</p>
            </div>
         )
      }
      return (
         <div>
            <label htmlFor={input.name} className={floatText}>{label}</label>
            <textarea {...input} type={type} id={input.name} label={label} size={size} className={textAreaClassName} min={min} maxLength={maxLength} onFocus={this.floatInputLabel} onBlur={this.landInputLabel} autoComplete="off" />
            <p className={errorClassName}>{touched && error}</p>
         </div>
      )
   }
}

export default Input




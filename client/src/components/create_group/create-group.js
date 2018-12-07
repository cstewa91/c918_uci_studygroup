import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import './create-group.css';
import Header from '../general/header';
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import { createNewGroup } from '../../actions';
import Input from '../input';


class CreateGroup extends Component {
   state = {
      hamburgerOpen: false,
  }

  toggleHamburger = () =>{
      this.setState((prevState) =>{
          console.log(prevState)
          return {
              hamburgerOpen: !prevState.hamburgerOpen
          }
      })
  }

  backdropHandler = () => {
      this.setState ({
          hamburgerOpen: false,
      })
  }

   handleCreateGroup = async (values) => {
      await this.props.createNewGroup(values);
      await this.pushToHome()
   }
   pushToHome = () => {
      const { validName } = this.props
      if (validName) {
         this.props.history.push('/home')
      }
   }
   render() {

      let backdrop;

      if(this.state.hamburgerOpen){
          backdrop = <Backdrop click={this.backdropHandler}/>
      }

      const { handleSubmit, invalidName } = this.props
      return (
         <div className="blue">
            <Header hamburgerClick = {this.toggleHamburger}/>  
            <Hamburger show={this.state.hamburgerOpen}/>
            {backdrop} 
            <h1>Create Group Page</h1>
            <form onSubmit={handleSubmit(this.handleCreateGroup)}>
               <div>
                  <Field name="name" label="Group Name" component={Input} />
               </div>
               <p>{invalidName}</p>
               <div>
                  <Field name="subject" label="Subject" component={Input} />
               </div>
               <div>
                  <Field name="course" label="Course Number" component={Input} />
               </div>
               <div>
                  <Field name="max_group_size" label="Group Size" component={Input} />
               </div>
               <div>
                  <Field name="start_time" component={Input} type="datetime-local" />
               </div>
               <div>
                  <Field name="end_time" component={Input} type="datetime-local" />
               </div>
               <div>
                  <Field name="location" label="Location" component={Input} />
               </div>
               <div>
                  <Field name="description" label="Description" component={Input} />
               </div>
               <button>Create Group</button>
            </form>
         </div>
      )
   }
}

function validate({ name, subject, course, max_group_size, start_time, end_time, location, description }) {
   const error = {}
   const validSubject = /^[a-z ,.'-]+$/i
   const validNumber = /^[0-9]*$/
   if (!name) {
      error.name = "Please enter your group name"
   }
   if (!subject || !validSubject.test(subject)) {
      error.subject = "Please enter the subject"
   }
   if (!course || !validNumber.test(course)) {
      error.course = "Please enter the course number"
   }
   if (!max_group_size || !validNumber.test(max_group_size)) {
      error.max_group_size = "Please enter the group size"
   }
   if (!start_time) {
      error.start_time = "Please enter the start time"
   }
   if (!end_time) {
      error.end_time = "Please enter the end time"
   }
   if (!location) {
      error.location = "Please enter the location"
   }
   if (!description) {
      error.description = "Please enter a short description"
   }
   return error;
}

function mapStateToProps(state) {
   return {
      validName: state.createGroup.validName,
      invalidName: state.createGroup.invalidName
   }
}

CreateGroup = reduxForm({
   form: 'create-group',
   validate: validate
})(CreateGroup);

export default connect(mapStateToProps, {
   createNewGroup: createNewGroup
})(CreateGroup);
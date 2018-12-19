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
import arrow from '../../assets/images/back-arrow.png';


class CreateGroup extends Component {
   state = {
      hamburgerOpen: false,
   }

   toggleHamburger = () => {
      this.setState((prevState) => {
         return {
            hamburgerOpen: !prevState.hamburgerOpen
         }
      })
   }

   backdropHandler = () => {
      this.setState({
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
      if (this.state.hamburgerOpen) {
         backdrop = <Backdrop click={this.backdropHandler} />
      }
      const { handleSubmit, invalidName } = this.props
      return (
         <div className="blue">
            <Header hamburgerClick={this.toggleHamburger} />
            <Hamburger show={this.state.hamburgerOpen} />
            {backdrop}
            <main className='create-content'>
               <div className='create-header row justify-content-center'>
                  <Link to='/home' className='create-return'>
                     <img className='create-account-return return-button' src={arrow} />
                     <span>Back</span>
                  </Link>
                  <p className='create-title col-9'>Create Group</p>
               </div>
               <form className='create-form container' onSubmit={handleSubmit(this.handleCreateGroup)}>
                  <div className="row justify-content-center">
                        <div className='create-groupName col-11'>  
                           <Field name="name" label="Group Name" maxLength='20' component={Input} />
                        </div>
                  </div>
                  <div className="row justify-content-around">
                        <div className='create-subject col-5'>
                           <Field name="subject" label="Subject" maxLength='15' component={Input} />
                        </div>
                        <div className='create-course col-5'>
                           <Field name="course" label="Course Number" maxLength='5' component={Input} />
                        </div>
                  </div>                 
                  <div className="row justify-content-around">
                        <div className='create-startTime col-5'>
                           <Field name="start_time" type='time' label="Starting Time" component={Input} />
                        </div>
                        <div className='create-endTime col-5'>
                           <Field name="end_time" type='time' label="Ending Time" component={Input} />
                        </div>
                  </div>
                  <div className="row justify-content-around">
                        <div className='create-date col-5'>
                           <Field name='date' type='date'  label="Date" component={Input} />
                        </div>
                        <div className='create-groupSize col-5'>
                           <Field name="max_group_size" label="Group Size" maxLength='3' component={Input} />
                        </div>
                  </div>
                  <div className="row justify-content-center">
                        <div className='create-location col-11'>
                           <Field name="location" label="Location" maxLength='15' component={Input} />
                        </div>
                  </div>
                  <div className="row justify-content-center">
                        <div className='create-description col-11'>
                           <Field name="description" label="Description" maxLength='100' component={Input} textArea='true'/>
                        </div>
                  </div>
                  <div className="row create-button justify-content-center">
                        <div className='col-6'>
                           <button className='btn create-update-button'>Create</button>
                        </div>  
                  </div>          
               </form>
            </main>
         </div>
      )
   }
}

function validate({ name, subject, course, max_group_size, start_time, end_time, location, description }) {
   const error = {}
   const validNumber = /^[0-9]*$/
   if (!name) {
      error.name = "Please enter your group name"
   }
   if (!subject) {
      error.subject = "Please enter the subject"
   }
   if (!course || !validNumber.test(course)) {
      error.course = "Please enter a number"
   }
   if (!max_group_size || !validNumber.test(max_group_size)) {
      error.max_group_size = "Please enter a number"
   }
   if (!start_time) {
      error.start_time = "Please enter start time"
   }
   if (!end_time) {
      error.end_time = "Please enter end time"
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import './create-group.css';
import Header from '../general/header'
import { createNewGroup } from '../../actions'
import Input from '../input';


class CreateGroup extends Component {
   handleAddItem = async (values) => {
      console.log(values)
      await this.props.createNewGroup(values);
      this.props.history.push('/home')
   }
   render() {
      const { handleSubmit } = this.props
      return (
         <div>
            <Header />
            <h1>Create Group Page</h1>
            <Link to="/hamburger">Hamburger</Link>
            <Link to="/home">X</Link>
            <form onSubmit={handleSubmit(this.handleAddItem)}>
               <div>
                  <Field name="name" label="Group Name" component={Input} />
               </div>
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
                  <Field name="start_time" label="Starting Time" component={Input} />
               </div>
               <div>
                  <Field name="end_time" label="Ending Time" component={Input} />
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

function validate({ name, subject, course, max_group_size, start_time, end_time, location, description}){
   const error = {}
   if(!name){
      error.name = "Please enter your group name"
   }
   if(!subject){
      error.subject = "Please enter the subject"
   }
   if(!course){
      error.course = "Please enter the course number"
   }
   if(!max_group_size){
      error.max_group_size = "Please enter the group size"
   }
   if(!start_time){
      error.start_time = "Please enter the start time"
   }
   if(!end_time){
      error.end_time = "Please enter the end time"
   }
   if(!location){
      error.location = "Please enter the location"
   }
   if(!description){
      error.description = "Please enter a short description"
   }
   return error;
}

CreateGroup = reduxForm({
   form: 'create-group',
   validate: validate
})(CreateGroup);

export default connect(null, {
   createNewGroup: createNewGroup
})(CreateGroup);
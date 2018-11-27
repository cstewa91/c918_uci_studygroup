import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import './create-group.css';
import Header from '../general/header'
import { createNewGroup } from '../../actions'


class CreateGroup extends Component {
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
                  <Field name="name" label="Group Name" component={this.renderInput} />
               </div>
               <div>
                  <Field name="subject" label="Subject" component={this.renderInput} />
               </div>
               <div>
                  <Field name="course" label="Course Number" component={this.renderInput} />
               </div>
               <div>
                  <Field name="max_group_size" label="Group Size" component={this.renderInput} />
               </div>
               <div>
                  <Field name="start_time" label="Starting Time" component={this.renderInput} />
               </div>
               <div>
                  <Field name="end_time" label="Ending Time" component={this.renderInput} />
               </div>
               <div>
                  <Field name="location" label="Location" component={this.renderInput} />
               </div>
               <div>
                  <Field name="description" label="Description" component={this.renderInput} />
               </div>
              <button>Create Group</button>
            </form>
         </div>
      )
   }
}

CreateGroup = reduxForm({
   form: 'create-group'
})(CreateGroup);

export default connect(null, {
   createNewGroup: createNewGroup
})(CreateGroup);
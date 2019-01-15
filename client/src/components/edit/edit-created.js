import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions'
import { editGroupInfo } from '../../actions'
import './edit-created.css';
import Header from '../general/header'
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import { Field, reduxForm } from 'redux-form';
import Input from '../input';
import {Link} from "react-router-dom";
import arrow from '../../assets/images/left-arrow.png';
import magnifier from '../../assets/images/magnifier.png';


class EditGroup extends Component{
    state = {
        hamburgerOpen: false,
    }

    toggleHamburger = () =>{
        this.setState((prevState) =>{
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

    componentDidMount = () => {
         this.props.getGroupDetails(this.props.match.params.group_id)
         
    }


    handleUpdateItem = async (values) => {
        await this.props.editGroupInfo(this.props.match.params.group_id, values);
        this.props.history.push('/home');
    }


    render(){
        let backdrop;
        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        const {handleSubmit} = this.props

        return (
            <div className="edit-created">
                <Header src={magnifier} href={'/search-group'} hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop}  
                <main className='edit-content container'>
                    <div className='create-header row justify-content-center align-items-center'>
                        <Link to='/home' className='create-return'>
                            <img className='create-account-return return-button' src={arrow} />
                            <span>Back</span>
                        </Link>
                        <p className='edit-title col-9'>EDIT GROUP</p>
                    </div>
                    <form className='edit-form justify-content-center container' onSubmit={handleSubmit(this.handleUpdateItem)}>
                        <div className="row justify-content-center">
                            <div className='edit-groupName col-11'>  
                                <Field name="name" label="Group Name" component={Input} />
                            </div>
                        </div>
                        <div className="row justify-content-around">
                            <div className='edit-subject col-5'>
                                <Field name="subject" label="Subject" maxLength='20' component={Input} />
                            </div>
                            <div className='edit-course col-5'>
                                <Field name="course" label="Course Number" maxLength='4' component={Input} />
                            </div>
                        </div>
                        
                        <div className="row justify-content-around">
                            <div className='edit-startTime col-5'>
                                <Field name="start_time" type='time' label="Starting Time" component={Input} />
                            </div>
                            <div className='edit-endTime col-5'>
                                <Field name="end_time" type='time' label="Ending Time" component={Input} />
                            </div>
                        </div>
                        <div className="row justify-content-around">
                            <div className='edit-date col-5'>
                                <Field name='date' value='2018-12-12' type='date'  label="Date" component={Input} />
                            </div>
                            <div className='edit-groupSize col-5'>
                                <Field name="max_group_size" label="Group Size" maxLength='3' component={Input} />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='edit-location col-11'>
                                <Field name="location" label="Location" maxLength='15' component={Input} />
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className='edit-description col-11'>
                                <Field name="description" label="Description" maxLength='100' component={Input} textArea='true'/>
                                
                            </div>
                        </div>
                        <div className="row edit-button justify-content-center">
                            <div className='col-6'>
                                <button className='btn edit-update-button'>Update</button>
                            </div>  
                        </div>
                        
                    </form>
                </main>
            </div>
                )
        }
}

function validate(values){
    const {name, subject, course, start_time, end_time, date, max_group_size, location, description} = values;
    const error = {}
    const validNumber = /^[0-9]*$/
    if(!name){
        error.name = 'Enter a group name'
    }
    if(!subject){
        error.subject = 'Enter a study subject'
    }
    if(!course){
        error.course = 'Enter a course (number)'
    }
    if(!start_time){
        error.start_time = 'Enter a start time'
    }
    if(!end_time){
        error.end_time = 'Enter a group name'
    }
    if(!date){
        error.date = 'Enter your study subject'
    }
    if (!max_group_size || !validNumber.test(max_group_size)) {
        error.max_group_size = 'Enter Group Size (number)'
    }
    if(!location){
        error.location = 'Enter study location'
    }
    if(!description){
        error.description = 'Enter group description'
    }
    return error
}


EditGroup = reduxForm({
    form: 'edit-group',
    enableReinitialize: true,
    validate: validate
})(EditGroup)

function mapStateToProps(state){
    const { singleGroup } = state.editGroup;

    return {
        initialValues: singleGroup,
        single_group: state.editGroup.singleGroup,
        date: state.editGroup.singleGroup.start_time
    }
}

export default connect(mapStateToProps, {
    getGroupDetails: getGroupDetails,
    editGroupInfo: editGroupInfo
})(EditGroup)
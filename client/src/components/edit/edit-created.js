import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions'
import { editGroupInfo } from '../../actions'
import './edit-created.css';
import Header from '../general/header'
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import { Field, reduxForm } from 'redux-form'
import Input from '../input';
import {Link} from "react-router-dom"
import { createVerify } from 'crypto';



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

    componentDidMount(){
        this.props.getGroupDetails(this.props.match.params.group_id)
    }

    handleUpdateItem = async (values) => {
        await this.props.editGroupInfo(this.props.match.params.group_id, values);
        this.props.history.push('/home');
    }

    render(){
        console.log(this.props)
        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        const {handleSubmit} = this.props

        return (
            <div className="edit-created">
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop}  
                <main className='edit-content container'>
                    <div className='edit-header row justify-content-center'>
                        <p className='edit-title col-10'>EDIT</p>
                        <Link to={`/group-info/${this.props.match.params.group_id}`} className='edit-return'>X</Link>
                    </div>
                    <form className='edit-form justify-content-center' onSubmit={handleSubmit(this.handleUpdateItem)}>
                        <div className="row justify-content-between">
                            <div className='edit-groupName col-7'>  
                                <Field name="name" label="Group Name" component={Input} />
                            </div>
                            <div className='edit-groupSize col-3'>
                                <Field name="max_group_size" label="Group Size" component={Input} />
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className='edit-subject col-5'>
                                <Field name="subject" label="Subject" component={Input} />
                            </div>
                            <div className='edit-course col-5'>
                                <Field name="course" label="Course Number" component={Input} />
                            </div>
                        </div>
                        
                        <div className="row justify-content-between">
                            <div className='edit-startTime col-5'>
                                <Field name="start_time" label="Starting Time" component={Input} type='datetime-local'/>
                            </div>
                            <div className='edit-endTime col-5'>
                                <Field name="end_time" label="Ending Time" component={Input} type="datetime-local" />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='edit-location col-10'>
                                <Field name="location" label="Location" component={Input} />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='edit-description col-10'>
                                <Field name="description" label="Description" component={Input} />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='edit-update col-8'>
                                <button className='btn edit-update-button'>update</button>
                            </div>  
                        </div>
                        
                    </form>
                </main>
            </div>
                )
        }
}

function validate(values){
    console.log('formvalues', values)
    const {username, firstname, lastname, email} = values;
    const error = {}

    if(!username){
        error.username = 'Please enter a username'
    }
    if(!firstname){
        error.firstname = 'Please enter your first name'
    }
    if(!lastname){
        error.lastname = 'Please enter your last name'
    }
    if(!email){
        error.email = 'Please enter a valid email address'
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
        single_group: state.editGroup.singleGroup
    }
}

export default connect(mapStateToProps, {
    getGroupDetails: getGroupDetails,
    editGroupInfo: editGroupInfo
})(EditGroup)
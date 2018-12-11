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




class EditGroup extends Component{
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

    componentDidMount(){
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
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop}  
                <main className='main-content container'>
                    <form className='edit-form row justify-content-center' onSubmit={handleSubmit(this.handleUpdateItem)}>
                        <div className='edit-groupName col-8'>  
                            <Field name="name" label="Group Name" component={Input} />
                        </div>
                        <div className='edit-groupSize col-4'>
                            <Field name="max_group_size" label="Group Size" component={Input} />
                        </div>
                        <div className='edit-subject col-4'>
                            <Field name="subject" label="Subject" component={Input} />
                        </div>
                        <div className='edit-course col-4'>
                            <Field name="course" label="Course Number" component={Input} />
                        </div>

                        <div className='edit-startTime col-8'>
                            <Field name="start_time" label="Starting Time" component={Input} type='datetime-local'/>
                        </div>
                        <div className='edit-endTime col-8'>
                            <Field name="end_time" label="Ending Time" component={Input} type="datetime-local" />
                        </div>
                        <div className='edit-location col-8'>
                            <Field name="location" label="Location" component={Input} />
                        </div>
                        <div className='edit-description col-8'>
                            <Field name="description" label="Description" component={Input} />
                        </div>
                        <div className='edit-update col-8'>
                            <button className='btn edit-update-button'>update</button>
                        </div>
                    </form>
                </main>
            </div>
                )
        }
}

EditGroup = reduxForm({
    form: 'edit-group',
    enableReinitialize: true
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
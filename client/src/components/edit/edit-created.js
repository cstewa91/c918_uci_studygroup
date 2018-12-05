import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions'
import { editGroupInfo } from '../../actions'
import './edit-created.css';
import Header from '../general/header'
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import { Field, reduxForm } from 'redux-form'
import Input from '../input';
import NavButton from '../general/nav-button'




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
                <main className='main-content'>
                    <div className='container'>
                    <p className='edit-group'>Edit Group:</p>
                    <form onSubmit={handleSubmit(this.handleUpdateItem)}>
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
                            <Field name="start_time" label="Starting Time" component={Input} type='datetime-local'/>
                        </div>
                        <div>
                            <Field name="end_time" label="Ending Time" component={Input} type="datetime-local" />
                        </div>
                        <div>
                            <Field name="location" label="Location" component={Input} />
                        </div>
                        <div>
                            <Field name="description" label="Description" component={Input} />
                        </div>
                        <button>update</button>
                        {/* <NavButton to='' text='UPDATE' /> */}
                    </form>
                    </div>
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
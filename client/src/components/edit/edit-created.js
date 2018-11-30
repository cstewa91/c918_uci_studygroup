import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions'
import { editGroupInfo } from '../../actions'
import './edit-created.css';
import Header from '../general/header'
import { Field, reduxForm } from 'redux-form'
import Input from '../input';
import NavButton from '../general/nav-button'




class EditGroup extends Component{

    componentDidMount(){
        this.props.getGroupDetails(this.props.match.params.group_id)
    }

    handleUpdateItem = async (values) => {
        await this.props.editGroupInfo(this.props.match.params.group_id, values);
        this.props.history.push('/home');
    }

    render(){
        const {handleSubmit} = this.props

        return (
            <div className="edit-created">
                <Header/>   
                <main className='main-content'>
                    <div className='container'>
                    <Link to='/hamburger' className='btn blue'>Hamburger</Link>
                    <Link to='/home'>X</Link>
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
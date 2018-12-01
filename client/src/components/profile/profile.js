import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {getUserInfo} from '../../actions';
import {editUserInfo} from '../../actions'
import './profile.css';
import Header from '../general/header';




class Profile extends Component {
    state = {
        isEditable: false,

    }

    renderInput(props){
        console.log(props)
        return (
            <div className={`input-field col-${props.size}`}>
                <label>{props.label}</label>
                <input {...props.input} type='text'/>
                <p>{props.meta.touched && props.meta.error}</p>
            </div>
        )
    }
    
    handleAddItem = async (values) => {
        await this.props.editUserInfo(values);
        this.props.getUserInfo();
        this.setState({
            isEditable: false,
        })
        

    }

    componentDidMount(){
        this.props.getUserInfo();
    }

    handleEditClick= (event)=>{
        this.setState ({
            isEditable: true,
        })
    }

    handleConfirm = (event)=>{
        this.setState ({
            isEditable: false,
        })
    }

    render(){

        const {username, firstname, lastname, email } = this.props.user
        const {handleSubmit} = this.props
        if(this.state.isEditable){
            return(
                <div className="profile">
                <Header/>   
                <main className='main-content'>
                    <div className='container'>
                    <Link to='/hamburger' className='btn blue'>Hamburger</Link>
                        <div className='main-title'>
                            <p className='edit-group'>PROFILE</p>
                        </div>
                        <form onSubmit={handleSubmit(this.handleAddItem)}>
                            <div className='row'>
                                    <Field size='12' name='username' label='Username' component={this.renderInput}/>
                            </div>
                            <div className='row'>
                                    <Field size='6' name='firstname' label='First name' component={this.renderInput}/>
                                                
                                    <Field size='6' name='lastname' label='Last name' component={this.renderInput}/>
                            </div>
                            <div className='row'>
                                    <Field size='12' name='email' label='E-mail' component={this.renderInput}/>
                            </div>
                            <div className='col-6 center'>
                                <button className='confirm btn btn-primary'>CONFIRM</button>
                            </div>
                        </form>  
                    </div>
                </main>               
            </div>
            )
        }


        return (
            <div className="profile">
                <Header/>   
                <main className='main-content'>
                    <div className='container'>
                    <Link to='/hamburger' className='btn blue'>Hamburger</Link>
                    
                        <div className='main-title'>
                            <p className='edit-group'>PROFILE</p>
                        </div>
                        <div className="profile-details">
                            <div className='profile-info'>
                                <label>USERNAME</label>
                                <div className='profile-username form-group'>
                                    <p>{username}</p>
                                </div>
                                <label>FIRST NAME</label>
                                <div className='profile-firstname form-group'>                  
                                    <p>{firstname}</p>
                                </div>
                                <label>LAST NAME</label>
                                <div className='profile-lastname form-group'>                       
                                    <p>{lastname}</p>
                                </div>
                                <label>E-MAIL</label>
                                <div className='profile-email form-group'>               
                                    <p>{email}</p>
                                </div>
                            </div>    
                        </div>
                    </div>
                </main>
                <footer>
                    <div className='confirm'>
                    <button onClick={this.handleEditClick} className='confirm btn btn-primary'>EDIT</button>
                    </div>
                </footer>
                
            </div>
        )
    }
    
}

function validate({username, firstname, lastname, email}){
    console.log('formvalues', username)
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

}

function mapStateToProps(state){

    const {user} = state.profile;

    return {
        initialValues: user,
        user: state.profile.user
    }
}

Profile = reduxForm({
    form: 'profile',
    enableReinitialize: true,
    validate: validate,
})(Profile)

export default  connect (mapStateToProps, {
    getUserInfo: getUserInfo,
    editUserInfo: editUserInfo,
}) (Profile)

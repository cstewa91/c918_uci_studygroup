import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {getUserInfo} from '../../actions';
import {editUserInfo} from '../../actions'
import './profile.css';
import Header from '../general/header';
import Backdrop from '../general/backdrop';
import Hamburger from '../general/hamburger';
import Input from '../input'



class Profile extends Component {
    state = {
        isEditable: false,
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

    renderInput(props){
        console.log(props)
        return (
            <div className={`input-field col-${props.size}`}>
                <div>{props.div}</div>
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

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        const {username, firstname, lastname, email } = this.props.user
        const {handleSubmit} = this.props
        if(this.state.isEditable){
            return(
                <div className="profile">
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className='profile-content container'>
                        <div className='profile-header row justify-content-center'>
                            <p className='profile-title col-10'>PROFILE</p>
                            <div onClick={this.handleConfirm} className='profile-return'>X</div>
                        </div>
                        <form className='profile-form row justify-content-center' onSubmit={handleSubmit(this.handleAddItem)}>
                            <div className='form-username col-10'>
                                    <Field name='username' label='Username' component={Input}/>
                            </div>
                            <div className='form-first col-10'>
                                    <Field name='firstname' label="First Name" component={Input}/>
                            </div>    
                            <div className='form-last col-10'>               
                                    <Field name='lastname' label="Last Name" component={Input}/>
                            </div>
                            <div className='form-email col-10'>
                                    <Field name='email' label="E-mail" component={Input}/>
                            </div>
                            <div className='profile-confirm col-10'>
                                    <button className='btn profile-confirm-button'>CONFIRM</button>
                            </div>
                            
                        </form>  
                        
                </main>               
            </div>
            )
        }


        return (
            <div className="profile">
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className='profile-content container'>
                    <div className='profile-header row justify-content-center'>
                        <p className='profile-title col-10 '>PROFILE</p>
                    </div>
                    <div className="profile-info row justify-content-center">     
                        <div className='profile-username col-10'>
                            <div className='profile-username-label'><b>Username</b></div>
                            <p>{username}</p>
                        </div>
                        <div className='profile-firstname col-10'>  
                            <div className='profile-firstName-label'><b>First Name</b></div>                
                            <p>{firstname}</p>
                        </div>
                        <div className='profile-lastname col-10'> 
                            <div className='profile-lastName-label'><b>Last Name</b></div>                      
                            <p>{lastname}</p>
                        </div>
                        <div className='profile-email col-10'>        
                            <div className='profile-email-label'><b>E-mail</b></div>       
                            <p>{email}</p>
                        </div> 
                    </div>
                    <div className='profile-edit row justify-content-center'>
                        <div onClick={this.handleEditClick} className='profile-edit-button col-10'>EDIT</div>
                    </div>
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

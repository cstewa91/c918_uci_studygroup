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
import Input from '../input';
import arrow from '../../assets/images/left-arrow.png';
import magnifier from '../../assets/images/magnifier.png';

class Profile extends Component {
    state = {
        isEditable: false,
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

    componentDidUpdate() {
    }

    handleEditClick = (event)=>{
        this.props.getUserInfo();
        this.setState ({
            isEditable: true,
        })
        
    }

    handleConfirm = (event)=>{
        this.setState ({
            isEditable: false,
        })
        // this.props.getUserInfo();
    }

    render(){

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        const {username, firstname, lastname, email } = this.props.user
        const {handleSubmit} = this.props
        console.log(this.props)
        if(this.state.isEditable){
            return(
                <div className="profile">
                <Header src={magnifier} href={'/search-group'} hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className='profile-content container'>
                        <div className='profile-header row justify-content-center'>
                            <div className='create-return' onClick={this.handleConfirm} >
                                <img className='create-account-return return-button' src={arrow}/>
                                <span>Back</span>
                            </div>
                            <p className='profile-title col-10'>PROFILE</p>
                        </div>
                        <form className='profile-form row' onSubmit={handleSubmit(this.handleAddItem)}>
                            <div className='form-username col-8'>
                                    <Field name='username' label='Username' maxLength='15' component={Input}/>
                            </div>
                            <div className='form-first col-8'>
                                    <Field name='firstname' label="First Name" maxLength='15' component={Input}/>
                            </div>    
                            <div className='form-last col-8'>               
                                    <Field name='lastname' label="Last Name" maxLength='15' component={Input}/>
                            </div>
                            <div className='form-email col-8'>
                                    <Field name='email' label="E-mail" maxLength='25'component={Input}/>
                            </div>
                            <div className='profile-confirm col-5'>
                                    <button className='btn profile-confirm-button'>CONFIRM</button>
                            </div>                           
                        </form>                       
                </main>               
            </div>
            )
        }


        return (
            <div className="profile">
                <Header src={magnifier} href={'/search-group'} hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className='profile-content container'>
                    <div className='profile-header row justify-content-center'>
                        <p className='profile-title col-11 '>PROFILE</p>
                    </div>
                    <div className="profile-info row">     
                        <div className='profile-username col-8'>
                            <div className='profile-username-label'><b>Username</b></div>
                            <p>{username}</p>
                        </div>
                        <div className='profile-firstname col-8'>  
                            <div className='profile-firstName-label'><b>First Name</b></div>                
                            <p>{firstname}</p>
                        </div>
                        <div className='profile-lastname col-8'> 
                            <div className='profile-lastName-label'><b>Last Name</b></div>                      
                            <p>{lastname}</p>
                        </div>
                        <div className='profile-email col-8'>        
                            <div className='profile-email-label'><b>E-mail</b></div>       
                            <p>{email}</p>
                        </div> 
                    </div>
                    <div className='row profile-edit justify-content-center'>
                        <div className='col-5'>
                            <button className='btn profile-edit-button' onClick={this.handleEditClick}>Edit</button>
                        </div>
                    </div>
                </main>                
            </div>
        )
    }
    
}

function validate(values){
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
    keepDirtyOnReinitialize: true,
    validate: validate,
})(Profile)

export default  connect (mapStateToProps, {
    getUserInfo: getUserInfo,
    editUserInfo: editUserInfo,
}) (Profile)

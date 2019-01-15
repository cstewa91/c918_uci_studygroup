import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './hamburger.css';
import user from '../../assets/images/user.png';
import groupAdd from '../../assets/images/group-create.png';
import home from '../../assets/images/home.png';
import magnifier from '../../assets/images/magnifier.png';
import logout from '../../assets/images/logout.png';
import {connect} from 'react-redux';
import {userSignOut} from '../../actions/';
import {getUserInfo} from '../../actions';
import worm from '../../assets/images/bookworm.png';

class Hamburger extends Component {
    
    componentDidMount(){
        this.props.getUserInfo()
    }
    
    SignOutButton(){
        const {auth, userSignOut} = this.props;

        if(auth){
            return (
                <li className='hamburger-profile rounded'>
                    <img src={logout} /> 
                    <Link to='/home' onClick={userSignOut} className='btn'>Log Out</Link>
                </li>
            )
        }
        if(!auth) {
            return (
                <li className='hamburger-profile rounded'>
                    <Link to='/create-account' className='btn '>Sign Up</Link>
                </li>
            )
        }
    }

    render(){

    const {username} = this.props.user

    let hamburgerClasses = 'hamburger-nav'

    if(this.props.show){
        hamburgerClasses = 'hamburger-nav open'
    }
        return (
            <nav className={hamburgerClasses}>
                <div className="hamburger-header border-bottom">
                    <Link className='hamburger-main-title' to='/home'>
                        <img src={worm}/>
                        <span>{username}</span>
                    </Link>     
                </div>
                <p className='hamburger-menu'>MENU</p>
                <ul className='hamburger-links nav flex-column justify-content-start'>
                    <li className='hamburger-home rounded'>
                        <img src={home} /> 
                        <Link to='/home' className='btn'>Home</Link>
                    </li>
                    <li className='hamburger-search rounded'>
                        <img src={magnifier} /> 
                        <Link to='/search-group' className='btn'>Search</Link>
                    </li>
                    <li className='hamburger-create rounded'>
                        <img src={groupAdd} /> 
                        <Link to='/create-group' className='btn'>Create</Link>
                    </li>       
                    <li className='hamburger-profile rounded'>
                        <img src={user} /> 
                        <Link to='/profile' className='btn'>Profile</Link>
                    </li>  
                    {this.SignOutButton()}
                </ul>
            </nav>
                
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.login.auth,
        user: state.profile.user,
    }
}

export default connect(mapStateToProps, {
    userSignOut: userSignOut,
    getUserInfo: getUserInfo,
}) (Hamburger)
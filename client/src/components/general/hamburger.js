import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './hamburger.css';
import user from '../../assets/images/user.png';
import groupAdd from '../../assets/images/group-create.png';
import home from '../../assets/images/home.png';
import magnifier from '../../assets/images/magnifier.png';
import NavButton from './nav-button';
import {connect} from 'react-redux';
import {userSignOut} from '../../actions/';

class Hamburger extends Component {

    SignOutButton(){
        const {auth, userSignOut} = this. props;

        if(auth){
            return (
                <div className='hamburger-signout'>
                    <button onClick={userSignOut} className='btn btn-primary'>Log Out</button>
                </div>
            )
        }
    }

    render(){
    let hamburgerClasses = 'hamburger-nav'

    if(this.props.show){
        hamburgerClasses = 'hamburger-nav open'
    }
        return (
            <nav className={hamburgerClasses}>
                <h1>This is the hamburger menu</h1>
                <ul>
                    <li className='hamburger-home'>
                        <img src={home} /> 
                        <Link to='/home' className='btn blue confirm'>Home</Link>
                    </li>
                    <li className='hamburger-search'>
                        <img src={magnifier} /> 
                        <Link to='/search-group' className='btn blue confirm'>Search</Link>
                    </li>
                    <li className='hamburger-create'>
                        <img src={groupAdd} /> 
                        <Link to='/create-group' className='btn blue confirm'>Create</Link>
                    </li>       
                    <li className='hamburger-profile'>
                        <img src={user} /> 
                        <Link to='/profile' className='btn blue confirm'>Profile</Link>
                    </li>  
                </ul>
                {this.SignOutButton()}
            </nav>
                
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.login.auth
    }
}

export default connect(mapStateToProps, {
    userSignOut: userSignOut,
}) (Hamburger)
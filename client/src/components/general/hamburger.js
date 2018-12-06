import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './hamburger.css';
import user from '../../assets/images/user.png';
import groupAdd from '../../assets/images/group-create.png';
import home from '../../assets/images/home.png';
import magnifier from '../../assets/images/magnifier.png';
import {connect} from 'react-redux';
import {userSignOut} from '../../actions/';
import {getUserInfo} from '../../actions'
import worm from '../../assets/images/bookworm.png'

class Hamburger extends Component {
    
    componentDidMount(){
        this.props.getUserInfo()
    }

    SignOutButton(){
        const {auth, userSignOut} = this. props;

        if(auth){
            return (
                <div className='hamburger-signout d-flex flex-row-reverse'>
                    <button onClick={userSignOut} className='btn signout-button '>Log Out</button>
                </div>
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
                <div className="hamburger-header">
                    <Link to='/home'>
                        <img src={worm}/>
                        <span>{username}</span>
                    </Link>     
                </div>
                <ul className='hamburger-links'>
                    <li className='hamburger-home rounded'>
                        <img src={home} /> 
                        <Link to='/home' className='btn blue confirm'>Home</Link>
                    </li>
                    <li className='hamburger-search rounded'>
                        <img src={magnifier} /> 
                        <Link to='/search-group' className='btn blue confirm'>Search</Link>
                    </li>
                    <li className='hamburger-create rounded'>
                        <img src={groupAdd} /> 
                        <Link to='/create-group' className='btn blue confirm'>Create</Link>
                    </li>       
                    <li className='hamburger-profile rounded'>
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
        auth: state.login.auth,
        user: state.profile.user,
    }
}

export default connect(mapStateToProps, {
    userSignOut: userSignOut,
    getUserInfo: getUserInfo,
}) (Hamburger)
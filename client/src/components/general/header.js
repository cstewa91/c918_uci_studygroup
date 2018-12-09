import React, {Component} from 'react';
import worm from '../../assets/images/bookworm.png';
import magnifier from '../../assets/images/magnifier.png';
import './header.css';
import {Link} from 'react-router-dom';
import HamburgerButton from './hamburger-button'
import {connect} from 'react-redux';
import {userSignOut} from '../../actions';
import {getUserInfo} from '../../actions';


class Header extends Component {
    
    componentDidMount(){
        this.props.getUserInfo()
    }

    SignOutButton(){
        const {auth, userSignOut} = this.props;

        if(auth){
            return (
                <div className="header-signout-button col-2">
                    <button onClick={userSignOut} className='btn header-button'>Log Out</button>
                </div>
                    
            )
        }
    }

    render(){
        return (
            <div className='header-container container-fluid '>
                <div className='header-section row  align-items-center'>
                    <div className='nav-hamburger-button col-2'>
                        <HamburgerButton click={this.props.hamburgerClick}/>
                    </div>
                    <div className='nav-title col-6 col-md-8 offset-md-2 '>
                        <Link to='/home'>
                            <img className='header-worm nav-logo' src={worm}/>
                            <span className='navbar-text'>Book Worms</span>
                        </Link>        
                    </div>
                    {this.SignOutButton()}  
                    <div className="nav-search col-2 d-flex justify-content-center">
                        <Link to='/search-group'>
                            <img src={magnifier} className="search-icon"></img>
                        </Link>
                    </div>
                    <nav className="nav-links col-12">
                        <ul className='d-flex link-group'>
                            <li>
                                <Link to='/home' data-hover='HOME'>HOME</Link>
                            </li>
                            <li>
                                <Link to='/search-group' data-hover='SEARCH'>SEARCH</Link>
                            </li>
                            <li>
                                <Link to='/create-group' data-hover='CREATE'>CREATE</Link>
                            </li>
                            <li>
                                <Link to='/profile' data-hover='PROFILE'>PROFILE</Link>
                            </li>
                        </ul>             
                    </nav>   
                </div>
                {/* <nav className='header-navbar row justify-content-between align-items-center'> */}
        </div>
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
}) (Header)
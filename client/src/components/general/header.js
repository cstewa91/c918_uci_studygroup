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
        const {auth, userSignOut} = this. props;

        if(auth){
            return (
                <div className='header-signout d-flex flex-row-reverse'>
                    <button onClick={userSignOut} className='btn header-signout-button '>Log Out</button>
                </div>
            )
        }
    }

    render(){
        return (
            <div className=' header-container'>
                    <nav className=' nav navbar row justify-content-between '>
                        <div className='nav-hamburger-button'>
                            <HamburgerButton click={this.props.hamburgerClick}/>
                        </div>
                        <div className='nav-title nav-brand'>
                            <Link to='/home'>
                                <img className='worm nav-logo' src={worm}/>
                                <span className='navbar-text'>Book Worms</span>
                            </Link>
                            {this.SignOutButton()}
                        </div>
                        
                        <div className="nav-search">
                            <Link to='/search-group'>
                                <img src={magnifier} className="search-icon"></img>
                            </Link>
                        </div>
                        <div className="nav-links row ">
                            <ul className="d-flex col-12 justify-content-around align-items-end">
                                <li>
                                    <Link to='/home'>HOME</Link>
                                </li>
                                <li>
                                    <Link to='/search-group'>SEARCH</Link>
                                </li>
                                <li>
                                    <Link to='/create-group'>CREATE</Link>
                                </li>
                                <li>
                                    <Link to='/profile'>PROFILE</Link>
                                </li>
                            </ul>
                            
                        </div>
                    </nav>
                    
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
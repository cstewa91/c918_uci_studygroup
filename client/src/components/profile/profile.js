import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../../actions';
import {editUserInfo} from '../../actions'
import './profile.css';
import Header from '../general/header';


class Profile extends Component {
    state = {
        isEditable: false,
    }

    componentDidMount(){
        console.log(this.props)
        this.props.getUserInfo(this.props);
    }

    handleEditClick= (event)=>{
        this.setState ({
            isEditable: true,
        })
    }

    render(){

        const {username, firstname, lastname, email } = this.props.user

        if(this.state.isEditable){
            // return form for editing

            return <form>Edit Profile</form>
        }


        return (
            <div className='profile'>
                <Header/>
                <main className='main-content'>
                    <div className='container'>
                        <div className='main-section'>
                            <div className='profile'>Profile</div>
                            <div className='user-info'>
                                <div className='username'>
                                    <div className='username-title'></div>
                                </div>
                                <div className='user-input'>
                                    <input className='username-field' type='text' placeholder={username}/>
                                </div>
                                <div className='firstname'>
                                    <div className='firstname-title'></div>
                                </div>
                                <div className='user-input'>
                                    <input className='firstname-field' type='text' placeholder={firstname}/>
                                </div>
                                <div className='lastname'>
                                    <div className='lastname-title'></div>
                                </div>
                                <div className='user-input'>
                                    <input className='lastname-field' type='text' placeholder={lastname}/>
                                </div>
                                <div className='email'>
                                    <div className='email-title'></div>
                                </div>
                                <div className='user-input'>
                                    <input className='email-field' type='text' placeholder={email}/>
                                </div>
                            </div>
                            <div className="error-list">
                                <span className="glyphicon glyphicon-check text-danger">Username must be ----</span>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <div className='confirm'>
                    <Link to='/home' className='confirm btn btn-primary'>Confirm</Link>
                    </div>
                </footer>
                
            </div>
        )
    }
    
}

function mapStateToProps(state){
    return {
        user: state.profile.user
    }
}

export default  connect (mapStateToProps, {
    getUserInfo: getUserInfo,
    editUserInfo: editUserInfo,
}) (Profile)

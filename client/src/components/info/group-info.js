import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions';
import NavButton from '../general/nav-button';
import './group-info.css';
import Header from '../general/header';
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import {getUserInfo} from '../../actions';
import {deleteGroup} from '../../actions';
import {leaveGroup} from '../../actions';


class GroupInfo extends Component{
    state = {
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

    leaveCurrentGroup = async () => {
        console.log('stuff', this.props.match.params.group_id)
        await this.props.leaveGroup(this.props.match.params.group_id);
        this.props.history.push('/home');
    }

    deleteCurrentGroup = async () => {
        await this.props.deleteGroup(this.props.match.params.group_id)
        await this.props.history.push('/home')
    }

    renderButton = () =>{
        const {id} = this.props.user;
        const {user_id} = this.props.singleGroup;
        if(id === user_id){
            return(
                <Fragment>
                    <div className='update'>
                        <NavButton to={`/edit-group/${this.props.match.params.group_id}`} text='EDIT'/>
                    </div>
                    <div className='delete-group'>
                        <button onClick={this.deleteCurrentGroup}>Delete Group</button>
                    </div>
                </Fragment>
                
            ) 
        }else{
            return(
                <div className="update">
                    <button onClick={this.leaveCurrentGroup}>Leave Group</button>
                </div>
            )
        }
    }
    

    

    formatStartTime = (startTime) => {
        const formattedStartTime = startTime.toLocaleTimeString();
        return formattedStartTime;
    }

    componentDidMount(){
        this.props.getGroupDetails(this.props.match.params.group_id);
        this.props.getUserInfo();
    }


    render(){

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        
        const {name, subject, course, start_time, end_time, max_group_size, current_group_size, location, description, user_id } = this.props.singleGroup
        const startDateTime = new Date(start_time);
        const endDateTime = new Date(end_time);
        const startingTime = startDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const startDate = startDateTime.toLocaleDateString();
        const endingTime = endDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        if(!{name}){
            return
            <h1>Loading...</h1>
        }

       

        return (
            <div className="edit-created">
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className='main-content'>
                    <div className='container'>
                    
                        <div className='main-title group-name'>
                            <h1>{name}</h1>
                        </div>
                        <div className="group-details">
                        <form className='group-info'>
                                <div className='subject form-group'>                  
                                    <p><strong>Subject:</strong> {subject}{course}</p>
                                </div>
                                <div className='date form-group'>               
                                    <p><strong>Date:</strong> {startDate}</p>
                                </div>
                                <div className='time form-group'>                 
                                    <p><strong>Time:</strong> {`${startingTime} - ${endingTime}`}</p>
                                </div>
                                <div className='users form-group'>             
                                    <p><strong>Group Size:</strong> {`${current_group_size}/${max_group_size}`}</p>
                                </div>
                                <div className='location form-group'>                  
                                    <p><strong>Location:</strong> {location}</p>
                                </div>
                                <div className='details'>        
                                    <p><strong>Description:</strong> {description}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <footer>
                        {this.renderButton()}
                </footer>
            </div>
                )
        }
}

function mapStateToProps(state){
    return {
        singleGroup: state.editGroup.singleGroup,
        user: state.profile.user
    }
}

export default connect(mapStateToProps, {
    getGroupDetails: getGroupDetails,
    getUserInfo: getUserInfo,
    leaveGroup: leaveGroup,
    deleteGroup: deleteGroup
})(GroupInfo)


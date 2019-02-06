import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions';
import worm from '../../assets/images/bookworm.png';
import map from '../../assets/images/map_icon.png';
import NavButton from '../general/nav-button';
import './group-info.css';
import Header from '../general/header';
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import {getUserInfo} from '../../actions';
import {deleteGroup} from '../../actions';
import {leaveGroup} from '../../actions';
import ConfirmModal from './confirm_modal';
import LeaveModal from './leave_modal';
import magnifier from '../../assets/images/magnifier.png';

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
        await this.props.leaveGroup(this.props.match.params.group_id, this.props.user.id);
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
                <div className="center-buttons">
                    <div className="edit-group-buttons">
                        <div className="update">
                            <NavButton to={`/edit-group/${this.props.match.params.group_id}`} text='EDIT'/>
                        </div>
                        <div className="delete-btn">
                            <ConfirmModal {...this.props}/>
                        </div>
                    </div>
                </div>
                
                
            ) 
        } else {
            return(
                <div className="update">
                    <LeaveModal {...this.props}/>
                </div>
            )
        }
    }

    formatStartTime = (date, startTime) => {
        const splitDate = date.split('');
        const splitTime = startTime.split('');
        splitDate[11] = splitTime[0];
        splitDate[12] = splitTime[1];
        const joinedDate = splitDate.join('');
        return joinedDate;
    }

    adjustTime = (time) => {
        const splicedTime = time.slice(0,5);
        const splitTime = splicedTime.split(':');
        if(splitTime[0] > 12){
            const hour = splitTime[0] - 12;
            splitTime[0] = hour;
            const joinedTime = splitTime.join(':');
            const pmTime = joinedTime + ' PM';
            return pmTime;
        } else if (splitTime[0] === '12') {
            const joinedTime = splitTime.join(':');
            const noonTime = joinedTime + ' PM';
            return noonTime;
        } else if(splitTime[0] === '00'){
            splitTime[0] = 12;
            const joinedTime = splitTime.join(':');
            const midnightTime = joinedTime + ' AM';
            return midnightTime;
        } else {
            const hour = splitTime[0];
            splitTime[0] = hour;
            const joinedTime = splitTime.join(':');
            const amTime = joinedTime + ' AM';
            return amTime;
        }
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
        
        const {name, subject, course, date, start_time, end_time, max_group_size, current_group_size, location, description, user_id } = this.props.singleGroup;
        if(!name){
            return (
                <div className="edit-created">
                    <Header src={magnifier} href={'/search-group'} hamburgerClick={this.toggleHamburger}/>
                    <Hamburger show={this.state.hamburgerOpen}/>
                    {backdrop}
                    <main className="group-details-content">
                        <div className="group-details-loading">
                                <h1>Loading...</h1>
                                <div className="worm">
                                    <p><img src={worm}/></p>
                            </div>
                        </div>
                    </main>
                </div>
            )
        }

        const groupDate = new Date(date).toLocaleDateString([], {month: '2-digit', day: '2-digit'});
        const mergedDate = this.formatStartTime(date, start_time);
        
        const originalDate = new Date(date).toLocaleTimeString();
        const studyDate = new Date(mergedDate).toLocaleTimeString();
        const startingTime = this.adjustTime(start_time);
        const endingTime = this.adjustTime(end_time);

        return (
            <div className="edit-created">
                <Header src={magnifier} hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className="group-details-content">                  
                        <div className="group-details">
                            <div className="group-info-header-container">
                                <div className="group-details-name row group-details-header">
                                    <h1>{name}</h1>
                                </div>
                            </div>
                            <form className="group-info">
                                <div className="group-info-subject form-group">                  
                                    <strong>Subject:</strong> {subject}{course}
                                </div>
                                <div className="group-info-date form-group">               
                                    <strong>Date:</strong> {groupDate}
                                </div>
                                <div className="group-info-time form-group">                 
                                    <strong>Time:</strong> {`${startingTime} - ${endingTime}`}
                                </div>
                                <div className="group-info-users form-group">             
                                    <strong>Group Size:</strong> {`${current_group_size}/${max_group_size}`}
                                </div>
                                <div className="group-info-location form-group">                  
                                    <strong>Location:</strong> {location}
                                        <a className="map-icon" href="https://map.uci.edu/" target="_blank"><img width="32px" src={map}/></a>
                                </div>
                                <div className="group-info-description">        
                                    <strong>Description:</strong> {description}
                                </div>
                            </form>
                            {this.renderButton()}
                        </div>
                </main>
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

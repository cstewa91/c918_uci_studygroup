import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions';
import worm from '../../assets/images/bookworm.png';
import NavButton from '../general/nav-button';
import './group-info.css';
import Header from '../general/header';
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import {getUserInfo} from '../../actions';
import {deleteGroup} from '../../actions';
import {leaveGroup} from '../../actions';
import ConfirmModal from './confirm_modal';


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
                    <div className="update">
                        <NavButton to={`/edit-group/${this.props.match.params.group_id}`} text='EDIT GROUP'/>
                    </div>
                    <div className="delete-group">
                        <div className="btn delete-group-button" onClick={this.deleteCurrentGroup}>Delete Group</div>
                    </div>
                </Fragment>
                
            ) 
        }else{
            return(
                <div className="update">
                    <div className="btn leave-group-button" onClick={this.leaveCurrentGroup}>Leave Group</div>
                </div>
            )
        }
    }
    

    

    formatStartTime = (date, startTime) => {
        const splitDate = date.split('');
        console.log(splitDate);
        const splitTime = startTime.split('');
        splitDate[11] = splitTime[0];
        splitDate[12] = splitTime[1];
        const joinedDate = splitDate.join('');
        console.log('joinedDate', joinedDate);
        return joinedDate;
    }

    adjustTime = (time) => {
        const splicedTime = time.slice(0,5);
        const splitTime = splicedTime.split(':');
        console.log(splitTime);
        console.log(splitTime[0]);
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
        console.log('component did mount props', this.props);
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
                    <Header hamburgerClick={this.toggleHamburger}/>
                    <Hamburger show={this.state.hamburgerOpen}/>
                    {backdrop}
                    <main className="container group-details-content">
                        <div className="group-details">
                            <div className="group-details">
                                <div className="group-details-name row group-details-header">
                                    <h1>Loading...</h1>
                                    <div className="worm">
                                        <img src={worm}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            )
        }

        console.log(this.props.singleGroup);
        const groupDate = new Date(date).toLocaleDateString([], {month: '2-digit', day: '2-digit'});
        console.log('start_time', start_time);
        console.log('date', date);
        const mergedDate = this.formatStartTime(date, start_time);
        console.log('mergedDate', mergedDate);
        
        const originalDate = new Date(date).toLocaleTimeString();
        const studyDate = new Date(mergedDate).toLocaleTimeString();
        console.log('studyDate', studyDate);
        console.log('originalDate', originalDate);
        const startingTime = this.adjustTime(start_time);
        const endingTime = this.adjustTime(end_time);
       

        return (
            <div className="edit-created">
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className="container group-details-content">                  
                        <div className="group-details">
                        <div className="group-details-name row group-details-header">
                            <h1>{name}</h1>
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
                                        <a className="btn modal-map-button" href="https://map.uci.edu/" target="_blank">Map</a>
                                </div>
                                <div className="group-info-description-container">        
                                    {description}
                                </div>
                            </form>
                            <ConfirmModal/>
                            {this.renderButton()}
                        </div>
                </main>
                <footer>
                        
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


import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {getGroupDetails} from '../../actions';
import {joinGroup} from '../../actions';
import worm from '../../assets/images/bookworm.png';
import map from '../../assets/images/map_icon.png';
import { showJoinedGroups } from '../../actions';
import { getJoinedGroups } from '../../actions';
import './group-modal.css';
import { getUserInfo } from '../../actions';
import {connect} from 'react-redux';

class GroupModal extends Component{
    state = {
        show: false
    };

    escKeyClose = (event) => {
        if(event.keyCode === 27){
            this.setState({show: false});
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escKeyClose, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escKeyClose, false);
    }

    joinStudyGroup = async () => {
        await this.props.joinGroup(this.props.id);
        await this.props.showJoinedGroups();
        await this.props.getJoinedGroups();
        this.props.history.push('/home');
    }

    renderJoinButton = () => {
        if(this.props.joined === 'True'){
            return (
                <Fragment>
                    <div className="btn btn-lg join-group-deactivated not-allowed">Join</div>
                    <p className="join-group-denied text-center">You are already in this group</p>
                </Fragment>
            )
        } else if(this.props.group.current_group_size === this.props.group.max_group_size){
            return (
                <Fragment>
                    <div className="btn btn-lg join-group-deactivated not-allowed">Join</div>
                    <p className="join-group-denied text-center">This group is full</p>
                </Fragment>
            )
        } else {
            return (
                <div onClick={this.joinStudyGroup} className="btn btn-lg join-group">Join</div>
            )
        }
    }

    open = () => {
        this.props.getGroupDetails(this.props.id);

        this.setState({show: true});
    };

    close = () => this.setState({show: false});

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


    render(){
        const { children, group, id} = this.props;
        const startDateTime = new Date(group.date);
        const groupDate = startDateTime.toLocaleDateString([], {month: '2-digit', day: '2-digit'});

        if(this.state.show) {
            
            if(!group.id){
                return (
                    <div id="group-modal" className="basic-modal">
                        <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                                <div className="group-modal-close" onClick={this.close}>
                                    &times;
                                </div>
                            <div className="group-modal-details">
                                <h1>Loading...</h1>
                                <div className="worm worm-centered">
                                    <img src={worm}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            const mergedDate = this.formatStartTime(group.date, group.start_time);
            
            const originalDate = new Date(group.date).toLocaleTimeString();
            const studyDate = new Date(mergedDate).toLocaleTimeString();
            const startingTime = this.adjustTime(group.start_time);
            const endingTime = this.adjustTime(group.end_time);

            const GroupData = (

            
                <div key={group.id} className="group-modal-details">
                    <h1 className="modal-group-name">{group.name}</h1>
                    <p className="modal-group-info"><strong>Subject/Course:</strong> {group.subject}{group.course}</p>
                    <p className="modal-group-info"><strong>Date:</strong> {groupDate}</p>
                    <p className="modal-group-info"><strong>Time:</strong> {startingTime} - {endingTime}</p>
                    <p className="modal-group-info">
                        <strong>Location:</strong> {group.location}
                            <a className="map-icon" href="https://map.uci.edu/" target="_blank"><img width="32px" src={map}/></a>
                    </p>
                    <p className="modal-group-info"><strong>Group Capacity:</strong> {group.current_group_size}/{group.max_group_size}</p>
                    <div className="modal-group-description-container">
                        <p className="modal-group-description">
                            {group.description}
                        </p>
                    </div>
                        {this.renderJoinButton()}
                </div>
            )


            return (
                <Fragment>
                    {children}
                    <div id="group-modal" tabIndex="-1" className="basic-modal" onClick={this.close}>
                        <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                                <div className="group-modal-close" onClick={this.close}>
                                    &times;
                                </div>
                            <div className="group-modal-details">
                                {GroupData }
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }

        return (
                <div className="search-results-body-row-data" onClick={this.open}>
                    {children}
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        group: state.search.selected,
        user: state.profile.user
    }
}

export default connect(mapStateToProps,{
    getGroupDetails: getGroupDetails,
    joinGroup: joinGroup,
    showJoinedGroups: showJoinedGroups,
    getJoinedGroups: getJoinedGroups,
    getUserInfo,
})(GroupModal);

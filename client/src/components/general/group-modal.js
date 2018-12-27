import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {getGroupDetails} from '../../actions';
import {joinGroup} from '../../actions';

import './group-modal.css';
import {connect} from 'react-redux';

class GroupModal extends Component{
    state = {
        show: false
    };

    componentDidMount(){

    }

    joinStudyGroup = async () => {
        await this.props.joinGroup(this.props.id);
        this.props.history.push('/home');
    }

    open = () => {
        this.props.getGroupDetails(this.props.id);

        this.setState({show: true});
    };

    close = () => this.setState({show: false});

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


    render(){

        const { children, group, id} = this.props;
        const startDateTime = new Date(group.date);
        const groupDate = startDateTime.toLocaleDateString([], {month: '2-digit', day: '2-digit'});

        const GroupData = (

            
            <div key={group.id} className="group-modal-details">
                <h1 className="modal-group-name">{group.name}</h1>
                <p className="modal-group-info"><strong>Subject/Course:</strong> {group.subject}{group.course}</p>
                <p className="modal-group-info"><strong>Date:</strong> {groupDate}</p>
                <p className="modal-group-info"><strong>Time:</strong> {group.start_time} - {group.end_time}</p>
                <p className="modal-group-info">
                    <strong>Location:</strong> {group.location}
                        <a className="btn modal-map-button" href="https://map.uci.edu/" target="_blank">Map</a>
                </p>
                <p className="modal-group-info"><strong>Group Capacity:</strong> {group.current_group_size}/{group.max_group_size}</p>
                <div className="modal-group-description-container">
                    <p className="modal-group-description">
                        {group.description}
                    </p>
                </div>
                    <div onClick={this.joinStudyGroup} className="btn btn-lg join-group">Join</div>
            </div>
        )

        if(this.state.show) {
            
            if(!group.id){
                return (
                    <div id="group-modal" className="basic-modal">
                        <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                            <Link to="/search-group">
                                <div className="group-modal-close" onClick={this.close}>
                                    x
                                </div>
                            </Link>
                            <div className="group-modal-details">
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </div>
                )
            }

            console.log('start_time', group.start_time);
            console.log('date', group.date);
            const mergedDate = this.formatStartTime(group.date, group.start_time);
            console.log('mergedDate', mergedDate);
            
            const originalDate = new Date(group.date).toLocaleTimeString();
            const studyDate = new Date(mergedDate).toLocaleTimeString();
            console.log('studyDate', studyDate);
            console.log('originalDate', originalDate);
            const startingTime = this.adjustTime(group.start_time);
            const endingTime = this.adjustTime(group.end_time);


            return (
                <Fragment>
                    {children}
                    <div id="group-modal" className="basic-modal">
                        <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                            <Link to="/search-group">
                                <div className="group-modal-close" onClick={this.close}>
                                    x
                                </div>
                            </Link>
                            <div className="group-modal-details">
                                {GroupData }
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <div className="search-results-body-row-data" onClick={this.open}>
                    {children}
                </div>
                <div className="search-results-body-row search-results-body-row-spacer">
                    <div className="search-results-body-cell">
                           
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        group: state.search.selected
    }
}

export default connect(mapStateToProps,{
    getGroupDetails: getGroupDetails,
    joinGroup: joinGroup
})(GroupModal);

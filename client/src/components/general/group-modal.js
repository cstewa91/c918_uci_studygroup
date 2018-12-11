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
        console.log('component Did Mount', this.props);
        console.log('Call action creator on mount to get item details for item:', this.props.id);


    }

    joinStudyGroup = async () => {
        console.log('joinStudyGroup props', this.props);
        await this.props.joinGroup(this.props.id);
        this.props.history.push('/home');
    }

    open = () => {
        this.props.getGroupDetails(this.props.id);

        this.setState({show: true});

        console.log('**** _OR_ **** Call action creator on open to get item details for item:', this.props.id);
    };

    close = () => this.setState({show: false});

    render(){

        const { children, group, id} = this.props;
        const startDateTime = new Date(group.start_time);
        const endDateTime = new Date(group.end_time);

        const startingTime = startDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const endingTime = endDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const startDate = startDateTime.toLocaleDateString([], {month: '2-digit', day: '2-digit'});

        const GroupData = (

            
                <div key={group.id} className="group-modal-details">
                    <h1 className="modal-group-name">{group.name}</h1>
                    <p className="modal-group-info"><strong>Subject/Course:</strong> {group.subject}{group.course}</p>
                    <p className="modal-group-info"><strong>Date:</strong> {startDate}</p>
                    <p className="modal-group-info"><strong>Time:</strong> {startingTime} - {endingTime}</p>
                    <p className="modal-group-info">
                        <strong>Location:</strong> {group.location}
                            <a className="btn btn-light modal-map-button" href="https://map.uci.edu/" target="_blank">Map</a>
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
            <div className="search-results-body-row" onClick={this.open}>
                {children}
            </div>
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

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

    render(){
        console.log('props of modal render', this.props);

        const { children, group, id} = this.props;
        const startDateTime = new Date(group.date);
        console.log(startDateTime);
        const groupDate = startDateTime.toLocaleDateString([], {month: '2-digit', day: '2-digit'});
        // const startTime = group.start_time.toLocaleTimeString([], {hour: '2-digit', day: '2-digit'});
        // console.log(startTime);

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
    console.log('state of getdetails', state);
    return {
        group: state.search.selected
    }
}

export default connect(mapStateToProps,{
    getGroupDetails: getGroupDetails,
    joinGroup: joinGroup
})(GroupModal);

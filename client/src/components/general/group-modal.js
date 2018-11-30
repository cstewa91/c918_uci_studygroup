import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {getGroupDetails} from '../../actions';
import './group-modal.css';
import {connect} from 'react-redux';

class GroupModal extends Component{
    state = {
        show: false
    };

    componentDidMount(){
        console.log('item props', this.props);
        console.log('Call action creator on mount to get item details for item:', this.props.id);


    }


    open = () => {
        this.props.getGroupDetails(this.props.id);

        this.setState({show: true});

        console.log('**** _OR_ **** Call action creator on open to get item details for item:', this.props.id);
    };

    close = () => this.setState({show: false});

    render(){

        const { group } = this.props;

        const GroupData = (
                <div key={group.id} className="group-modal-details">
                    <h1 className="group-name">{group.name}</h1>
                    <p className="group-subject"><strong>Subject/Course:</strong> {group.subject}{group.course}</p>
                    <p className="group-timeslot"><strong>Date/Time:</strong> {group.start_time} - {group.end_time}</p>
                    <p className="group-location"><strong>Location:</strong> {group.location}</p>
                    <div className="btn btn-light map-button">
                        <a href="https://map.uci.edu/" target="_blank">MAP</a>
                    </div>
                    <p className="group-capacity"><strong>Group Capacity:</strong> {group.current_group_size}/{group.max_group_size}</p>
                    <div className="group-description-container">
                        <p className="group-description">
                            {group.description}
                        </p>
                    </div>
                    <Link to="/home">
                        <div className="btn btn-primary join-group offset-5">Join</div>
                    </Link>
                </div>
        )

        if(this.state.show) {

            return (
                <div id="group-modal" className="basic-modal">
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <Link to="/search-group">
                            <div className="basic-modal-close" onClick={this.close}>
                                x
                            </div>
                        </Link>
                        <div className="group-modal-details">
                            {GroupData }
                            {/*<p className="group-subject">{this.props.subject}{this.props.course}</p>*/}
                            {/*<p className="group-capacity">2/3 members</p>*/}
                            {/*<p className="group-timeslot">8:00 AM - 9:00 AM</p>*/}
                            {/*<p className="group-date">11/6</p>*/}
                            {/*<p className="group-location">Wheeler Hall</p>*/}
                            {/*<div className="btn btn-light map-button">*/}
                                {/*<a href="https://map.uci.edu/" target="_blank">MAP</a>*/}
                            {/*</div>*/}
                            {/*<div className="group-description-container">*/}
                                {/*<p className="group-description">*/}
                                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et pretium tellus.*/}
                                    {/*Phasellus vulputate dignissim magna sed sodales. Phasellus convallis posuere magna*/}
                                    {/*vel malesuada. Quisque at efficitur arcu. Ut quis enim cursus, sollicitudin orci eu,*/}
                                    {/*fermentum tellus. Vestibulum porta purus eget luctus luctus. Praesent non diam*/}
                                    {/*hendrerit, egestas sapien ac, molestie mauris. Pellentesque elementum, dui a congue*/}
                                    {/*dignissim, eros urna maximus arcu, quis interdum risus ligula quis risus. Cras ac*/}
                                    {/*molestie velit. Duis interdum mauris vitae metus aliquam, non auctor lacus*/}
                                    {/*consectetur.*/}
                                {/*</p>*/}
                            {/*</div>*/}
                            {/*<Link to="/home">*/}
                                {/*<div className="btn btn-primary join-group offset-5">Join</div>*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                </div>
            )
        }

        return <li onClick={this.open}>{this.props.text}</li>;
    }
}

function mapStateToProps(state) {
    return {
        group: state.search.selected
    }
}

export default connect(mapStateToProps,{
    getGroupDetails: getGroupDetails
})(GroupModal);

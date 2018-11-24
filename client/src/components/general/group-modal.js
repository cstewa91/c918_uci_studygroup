import React from 'react';
import { Link } from 'react-router-dom';
import './group-modal.css';

export default () => {
    return (
        <div>
            <div id="group-modal" className="modal">
                <div className="group-modal-content">
                    <h1 className="group-name">The Awesome Group</h1>
                    <Link to="/search-group"><span className="close-modal">&times;</span></Link>
                    <div className="group-modal-details">
                        <span className="group-subject">ENG</span> <span className="group-course">101</span>
                        <span className="group-capacity">2/3</span>
                        <span className="group-timeslot">8:00 AM - 9:00 AM</span>
                        <span className="group-date">11/6</span>
                        <span className="group-location">Wheeler Hall</span>
                        <div className="btn map-button"><a href="https://map.uci.edu/" target="_blank">MAP</a></div>
                        <div className="group-description-container">
                            <p className="group-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et pretium tellus.
                                Phasellus vulputate dignissim magna sed sodales. Phasellus convallis posuere magna vel
                                malesuada. Quisque at efficitur arcu. Ut quis enim cursus, sollicitudin orci eu,
                                fermentum tellus. Vestibulum porta purus eget luctus luctus. Praesent non diam
                                hendrerit, egestas sapien ac, molestie mauris. Pellentesque elementum, dui a congue
                                dignissim, eros urna maximus arcu, quis interdum risus ligula quis risus. Cras ac
                                molestie velit. Duis interdum mauris vitae metus aliquam, non auctor lacus consectetur.
                            </p>
                        </div>
                        <Link to="/home"><button className="join-group">Join</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
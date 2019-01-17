import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../general/header';
import Backdrop from '../general/backdrop';
import Hamburger from '../general/hamburger';
import { getCreatedGroups } from '../../actions';
import { getJoinedGroups } from '../../actions';
import { getUserInfo } from '../../actions';
import { showJoinedGroups } from '../../actions';
import { showCreatedGroups } from '../../actions';
import { connect } from 'react-redux';
import magnifier from '../../assets/images/magnifier.png';


class Home extends Component {
   state = {
      hamburgerOpen: false,
   }
   toggleHamburger = () => {
      this.setState((prevState) => {
         return {
            hamburgerOpen: !prevState.hamburgerOpen
         }
      })
   }
   backdropHandler = () => {
      this.setState({
         hamburgerOpen: false,
      })
   }
   componentDidMount() {
      this.props.getCreatedGroups();
      this.props.getJoinedGroups();
      this.props.getUserInfo();
   }
   switchGroups = () => {
      if (this.props.joinedGroups) {
         this.props.showCreatedGroups();
      } else {
         this.props.showJoinedGroups();
      }
   }
   renderCreatedGroups = () => {
      const listCreatedGroups = this.props.created.map(item => {
         const newDate = new Date(item.date);
         const sliceDateStart = item.date.slice(0, 11) + item.start_time
         const sliceDateEnd = item.date.slice(0, 11) + item.end_time
         const startTime = new Date(sliceDateStart);
         const endTime = new Date(sliceDateEnd);
         const startingTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const endingTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const startDate = newDate.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
         return (
            <Fragment key={item.id}>
               <div className="card home-single-group">
                  <Link to={`/group-info/${item.id}`}>
                     <div className="home-card-container">
                        <div className="card-header">
                           {item.name}
                        </div>
                        <div className="card-text-container">
                           <div className="card-text">
                              {item.subject} {item.course}
                           </div>
                           <div className="card-text">
                              {startDate}
                           </div>
                           <div className="card-text">
                              {startingTime} - {endingTime}
                           </div>
                           <div className="card-text">
                              <sup>{item.current_group_size}</sup>&frasl;{<sub>{item.max_group_size}</sub>} Members
                           </div>
                        </div>
                     </div>
                  </Link>
               </div>
            </Fragment >
         )
      })
      return listCreatedGroups;
   }
   renderJoinedGroups = () => {
      const listJoinedGroups = this.props.joined.map(item => {
         const newDate = new Date(item.date);
         const sliceDate = item.date.slice(0, 11) + item.start_time
         const startTime = new Date(sliceDate);
         const startingTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const startDate = newDate.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
         if (this.props.userId !== item.user_id) {
            return (
               <Fragment key={item.id}>
                  <div className="card home-single-group">
                     <Link to={`/group-info/${item.id}`}>
                        <div className="home-card-container">
                           <div className="card-header">
                              {item.name}
                           </div>
                           <div className="card-text-container">
                              <div className="card-text">
                                 {item.subject} {item.course}
                              </div>
                              <div className="card-text">
                                 {startDate}
                              </div>
                              <div className="card-text">
                                 {startingTime} - {endingTime}
                              </div>
                              <div className="card-text">
                                 <sup>{item.current_group_size}</sup>&frasl;{<sub>{item.max_group_size}</sub>} Members
                              </div>
                           </div>
                        </div>
                     </Link>
                  </div>
               </Fragment >
            )
         }
      })
      return listJoinedGroups;
   }
   render() {
      let backdrop;
      if (this.state.hamburgerOpen) {
         backdrop = <Backdrop click={this.backdropHandler} />
      }
      if (this.props.joinedGroups) {
         return (
            <div>
               <Header src={magnifier} href={'/search-group'} hamburgerClick={this.toggleHamburger} />
               <Hamburger show={this.state.hamburgerOpen} />
               {backdrop}
               <div className="home-page-container">
                  <div className="home-container">
                     <div className="home-group-header">
                        <div className="home-active-tab">Joined</div>
                        <div className="home-not-active-tab" onClick={this.switchGroups}>Created</div>
                     </div>
                     <div className="home-groups-container">
                        {this.renderJoinedGroups()}
                     </div>
                     <div className="home-add-button-container">
                        <Link to="/create-group"><i className="fas fa-plus fa-2x home-add-button"></i></Link>
                     </div>
                  </div>
               </div>
            </div>
         )
      }
      return (
         <div>
            <Header src={magnifier} href={'/search-group'} hamburgerClick={this.toggleHamburger} />
            <Hamburger show={this.state.hamburgerOpen} />
            {backdrop}
            <div className="home-page-container">
               <div className="home-container">
                  <div className="home-group-header">
                     <div className="home-not-active-tab" onClick={this.switchGroups}>Joined</div>
                     <div className="home-active-tab">Created</div>
                  </div>
                  <div className="home-groups-container">
                     {this.renderCreatedGroups()}
                  </div>
                  <div className="home-add-button-container">
                     <Link to="/create-group"><i className="fas fa-plus fa-2x home-add-button"></i></Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

function mapStateToProps(state) {

   return {
      created: state.home.created,
      joined: state.home.joined,
      userId: state.profile.user.id,
      joinedGroups: state.home.joinedGroups
   }
}

export default connect(mapStateToProps, {
   getJoinedGroups: getJoinedGroups,
   getCreatedGroups: getCreatedGroups,
   getUserInfo: getUserInfo,
   showJoinedGroups: showJoinedGroups,
   showCreatedGroups: showCreatedGroups
})(Home)
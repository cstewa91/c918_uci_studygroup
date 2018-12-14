import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../general/header';
import Backdrop from '../general/backdrop';
import Hamburger from '../general/hamburger';
import { getCreatedGroups } from '../../actions';
import { getJoinedGroups } from '../../actions';
import { getUserInfo } from '../../actions';
import { connect } from 'react-redux';



class Home extends Component {
   state = {
      hamburgerOpen: false,
      joinedGroups: true,
   }
   toggleHamburger = () => {
      this.setState((prevState) => {
         console.log(prevState)
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
   showJoinedGroups = () => {
      this.setState({
         joinedGroups: true,
      })
   }
   showCreatedGroups = () => {
      this.setState({
         joinedGroups: false,
      })
   }
   componentDidMount() {
      this.props.getCreatedGroups();
      this.props.getJoinedGroups();
      this.props.getUserInfo();
   }
   renderCreatedGroups = () => {
      const listCreatedGroups = this.props.created.map(item => {
         const startDateTime = new Date(item.start_time);
         const endDateTime = new Date(item.end_time);
         const startingTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const endingTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const startDate = startDateTime.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
         return (
            <Fragment key={item.id}>
               <div className="home-single-group">
                     <Link to={`/group-info/${item.id}`}>
                        <div className="home-group-details home-group-subject">
                           {item.subject}{item.course}
                        </div>
                        <div className="home-group-details home-group-name">
                           {item.name}
                        </div>
                        <div className="home-group-details home-group-date">
                           {startDate}
                        </div>
                        <div className="home-group-details home-group-time">
                           {startingTime}
                        </div>
                        <div className="home-group-details home-group-size">
                           {<sup>{item.current_group_size}</sup>}&frasl;{<sub>{item.max_group_size}</sub>}
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
         const startDateTime = new Date(item.start_time);
         const endDateTime = new Date(item.end_time);
         const startingTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const endingTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const startDate = startDateTime.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
         if (this.props.userId !== item.user_id) {
            return (
               <Fragment key={item.id}>
                  <div className="home-single-group">
                     <Link to={`/group-info/${item.id}`}>
                        <div className="home-group-details">
                           {item.subject}{item.course}
                        </div>
                        <div className="home-group-details">
                           {item.name}
                        </div>
                        <div className="home-group-details">
                           {startDate}
                        </div>
                        <div className="home-group-details">
                           {startingTime}
                        </div>
                        <div className="home-group-details">
                           {<sup>{item.current_group_size}</sup>}&frasl;{<sub>{item.max_group_size}</sub>}
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
      if (this.state.joinedGroups) {
         return (
            <div>
               <Header hamburgerClick={this.toggleHamburger} />
               <Hamburger show={this.state.hamburgerOpen} />
               {backdrop}

               <div className="home-container">
                  <div>
                     <div className="home-active-tab">Joined</div>
                     <div className="home-not-active-tab" onClick={this.showCreatedGroups}>Created</div>
                  </div>
                  <div className="home-groups-container">
                     <div className="home-groups-header">
                        <div>SUBJECT</div>
                        <div>NAME</div>
                        <div>DATE</div>
                        <div>TIME</div>
                        <div>SIZE</div>
                     </div>
                  </div>
                  <div className="home-groups-container">
                     {this.renderJoinedGroups()}
                  </div>
                  <div className="home-add-button-container">
                     <Link to="/create-group"><i className="fas fa-plus fa-2x home-add-button"></i></Link>
                  </div>
               </div>
            </div >
         )
      }
      return (
         <div>
            <Header hamburgerClick={this.toggleHamburger} />
            <Hamburger show={this.state.hamburgerOpen} />
            {backdrop}
            <div className="home-container">
               <div>
                  <div className="home-not-active-tab" onClick={this.showJoinedGroups}>Joined</div>
                  <div className="home-active-tab">Created</div>
               </div>
               <div className="home-header-container">
                  <div className="home-groups-header">
                     <div>SUBJECT</div>
                     <div>NAME</div>
                     <div>DATE</div>
                     <div>TIME</div>
                     <div>SIZE</div>
                  </div>
               </div>
               <div className="home-groups-container">
                  {this.renderCreatedGroups()}
               </div>
               <div className="home-add-button-container">
                  <Link to="/create-group"><i className="fas fa-plus fa-2x home-add-button"></i></Link>
               </div>
            </div>
         </div >
      )
   }
}

function mapStateToProps(state) {
   return {
      created: state.home.created,
      joined: state.home.joined,
      userId: state.profile.user.id
   }
}

export default connect(mapStateToProps, {
   getJoinedGroups: getJoinedGroups,
   getCreatedGroups: getCreatedGroups,
   getUserInfo: getUserInfo,
})(Home)
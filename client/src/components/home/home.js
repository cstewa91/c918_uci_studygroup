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
               <div className="search-results-body-cell search-results-body-cell-left">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {item.subject}{item.course}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-center">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {item.name}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-center">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {startDate}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-center">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {startingTime}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-right">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {<sup>{item.current_group_size}</sup>}&frasl;{<sub>{item.max_group_size}</sub>}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-row-data">
               </div>
               <div className="search-results-body-row search-results-body-row-spacer">
                  <div className="search-results-body-cell">
                  </div>
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
            <Fragment key={item.id}>
               <div className="search-results-body-cell search-results-body-cell-left">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {item.subject}{item.course}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-center">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {item.name}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-center">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {startDate}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-center">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {startingTime}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-cell search-results-body-cell-right">
                  <Link to={`/group-info/${item.id}`}>
                     <div>
                        {<sup>{item.current_group_size}</sup>}&frasl;{<sub>{item.max_group_size}</sub>}
                     </div>
                  </Link>
               </div>
               <div className="search-results-body-row-data">
               </div>
               <div className="search-results-body-row search-results-body-row-spacer">
                  <div className="search-results-body-cell">
                  </div>
               </div>
            </Fragment >
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

               <div className="search-main-content">
                  <div className="search-filter-container">
                     <div className="home-active-tab">Joined</div>
                     <div className="home-not-active-tab" onClick={this.showCreatedGroups}>Created</div>
                  </div>
                  <div>
                     <div id="search-results-header">
                        <div className="search-results-head-cell">
                           <u>SUBJECT</u>
                        </div>
                        <div className="search-results-head-cell">
                           <u>NAME</u>
                        </div>
                        <div className="search-results-head-cell">
                           <u>DATE</u>
                        </div>
                        <div className="search-results-head-cell">
                           <u>TIME</u>
                        </div>
                        <div className="search-results-head-cell">
                           <u>SIZE</u>
                        </div>
                     </div>
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
            <div className="home-groups-container"></div>
            <div className="search-main-content">
               <div className="search-filter-container">
                  <div className="home-not-active-tab" onClick={this.showJoinedGroups}>Joined</div>
                  <div className="home-active-tab">Created</div>
               </div>
               <div>
                  <div id="search-results-header">
                     <div className="search-results-head-cell">
                        <u>SUBJECT</u>
                     </div>
                     <div className="search-results-head-cell">
                        <u>NAME</u>
                     </div>
                     <div className="search-results-head-cell">
                        <u>DATE</u>
                     </div>
                     <div className="search-results-head-cell">
                        <u>TIME</u>
                     </div>
                     <div className="search-results-head-cell">
                        <u>SIZE</u>
                     </div>
                  </div>
                  {this.renderCreatedGroups()}
               </div>
               <div className="home-add-button-container">
                  <Link to="/create-group" ><i className="fas fa-plus fa-2x home-add-button"></i></Link>
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
      userId: state.profile.user.id
   }
}

export default connect(mapStateToProps, {
   getJoinedGroups: getJoinedGroups,
   getCreatedGroups: getCreatedGroups,
   getUserInfo: getUserInfo,
})(Home)
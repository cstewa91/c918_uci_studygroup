import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../general/header';
import Backdrop from '../general/backdrop';
import Hamburger from '../general/hamburger';
import { getCreatedGroups } from '../../actions';
import { getJoinedGroups } from '../../actions';
import { getUserInfo } from '../../actions';
import { connect } from 'react-redux';
import add from '../../assets/images/add.png'



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
   render() {
      let backdrop;
      if (this.state.hamburgerOpen) {
         backdrop = <Backdrop click={this.backdropHandler} />
      }
      const listCreatedGroups = this.props.created.map(item => {
         const startDateTime = new Date(item.start_time);
         const endDateTime = new Date(item.end_time);
         const startingTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const endingTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const startDate = startDateTime.toLocaleDateString();
         return <div key={item.id}><Link to={`/group-info/${item.id}`}> {item.name} {item.subject} {item.course} {startDate} {startingTime}-{endingTime} {item.current_group_size}/{item.max_group_size}</Link></div>
      })
      const listJoinedGroups = this.props.joined.map(item => {
         const startDateTime = new Date(item.start_time);
         const endDateTime = new Date(item.end_time);
         const startingTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const endingTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         const startDate = startDateTime.toLocaleDateString();
         if (this.props.userId !== item.user_id) {
            return <div key={item.id}><Link to={`/group-info/${item.id}`}> {item.name} {item.subject} {item.course} {startDate} {startingTime}-{endingTime} {item.current_group_size}/{item.max_group_size}</Link></div>
         }
      })
      if (this.state.joinedGroups) {
         return (
            <div>
               <Header hamburgerClick={this.toggleHamburger} />
               <Hamburger show={this.state.hamburgerOpen} />
               {backdrop}
               <div className="home-active-tab">Joined</div>
               <div className="home-not-active-tab" onClick={this.showCreatedGroups}>Created</div>
               <div>Name Subject Course Date Time Members</div>
               <div>{listJoinedGroups}</div>
               <Link to="/create-group"><i className="fas fa-plus fa-2x home-add-button"></i></Link>
            </div>
         )
      }
      return (
         <div>
            <Header hamburgerClick={this.toggleHamburger} />
            <Hamburger show={this.state.hamburgerOpen} />
            {backdrop}
            <div className="home-container">
               <div className="home-not-active-tab" onClick={this.showJoinedGroups}>Joined</div>
               <div className="home-active-tab">Created</div>
               <div>Name Subject Course Date Time Members</div>
               <div>{listCreatedGroups}</div>
               <div>
                  <Link to="/create-group"><i className="fas fa-plus fa-2x home-add-button"></i></Link>
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
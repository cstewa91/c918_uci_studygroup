import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../general/header';
import Backdrop from '../general/backdrop';
import Hamburger from '../general/hamburger';
import { getCreatedGroups } from '../../actions';
import { getJoinedGroups } from '../../actions';
import { connect } from 'react-redux';



class Home extends Component {
   state = {
      hamburgerOpen: false,
   }

   toggleHamburger = () =>{
      this.setState((prevState) =>{
          console.log(prevState)
          return {
              hamburgerOpen: !prevState.hamburgerOpen
          }
      })
  }

  backdropHandler = () => {
   this.setState ({
       hamburgerOpen: false,
   })
}


   componentDidMount() {
      
      this.props.getCreatedGroups();
      this.props.getJoinedGroups();
      console.log('mount', this.props)
   }
   render() {

      let backdrop;

      if(this.state.hamburgerOpen){
         backdrop = <Backdrop click={this.backdropHandler}/>
     }

      console.log(this.props)
      const listCreatedGroups = this.props.created.map(item => {
         return <div key={item.id}><Link to={`/group-info/${item.id}`}> {item.name} {item.location} {item.subject}</Link></div>
      })
      const listJoinedGroups = this.props.joined.map(item => {
         return <div key={item.id}><Link to={`/group-info/${item.id}`}> {item.name} {item.location} {item.subject}</Link></div>
      })
      return (
         <div>
            <Header hamburgerClick = {this.toggleHamburger}/>
            <Hamburger show={this.state.hamburgerOpen}/>
            {backdrop}
            <h1>Home Page</h1>
            <Link to="/search-group"><button>Search</button></Link>
            <div>Joined</div>
            <div>{listJoinedGroups}</div>
            <div>Created</div>
            <div>{listCreatedGroups}</div>
            <Link to="/create-group"><button>Create a group</button></Link>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      created: state.home.created,
      joined: state.home.joined
   }
}

export default connect(mapStateToProps, {
   getJoinedGroups: getJoinedGroups,
   getCreatedGroups: getCreatedGroups
})(Home)
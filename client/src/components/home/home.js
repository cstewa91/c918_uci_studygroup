import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../general/header';
import { getCreatedGroups } from '../../actions';
import { getJoinedGroups } from '../../actions';
import { connect } from 'react-redux';

class Home extends Component {
   componentDidMount() {
      this.props.getCreatedGroups();
      this.props.getJoinedGroups();
   }
   render() {
      console.log(this.props.created[0])
      const listCreatedGroups = this.props.created.map(item => {
         return <Link to="/awesome-group"><div key={item.id}>{item.name} {item.location} {item.subject}</div></Link>
      })
      const listJoinedGroups = this.props.joined.map(item => {
         return <Link to="/awesome-group"><div key={item.id}>{item.name} {item.location} {item.subject}</div></Link>
      })
      return (
         <div>
            <Header />
            <h1>Home Page</h1>
            <Link to="/hamburger">Hamburger</Link>
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
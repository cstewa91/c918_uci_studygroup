import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import Create from './create/create-group';
import Profile from './profile/profile';
import EditCreated from './edit/edit-created';
import Hamburger from './general/hamburger';
import Search from './search/search-page';
import GroupModal from './general/group-modal';
import GroupInfo from './info/group-info';



class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/create-group" component={Create} />
                <Route path="/profile" component={Profile} />
                <Route path='/edit-created' component={EditCreated} />
                <Route path='/hamburger' component={Hamburger} />
                <Route path='/search-group' component={Search} />
                <Route path='/selected-group' component={GroupModal} />
                <Route path='/awesome-group' component={GroupInfo} />
            </div>
        )
    }
}

export default App;

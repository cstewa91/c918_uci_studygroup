import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './bookworm_login/login';
import Home from './bookworm_home/home';
import Create from './bookworm_create/create-group';
import Profile from './bookworm_profile/profile';
import EditCreated from './bookworm_edit/edit-created';
import Hamburger from './bookworm-general/hamburger';
import Search from './bookworm_search/search-page';
import GroupModal from './bookworm-general/group-modal';
import GroupInfo from './bookworm_info/group-info';



class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/create-group" component={Create} />
                <Route path="/profile" component={Profile}/>
                <Route path='/edit-created' component={EditCreated}/>
                <Route path='/hamburger' component={Hamburger}/>
                <Route path='/search-group' component={Search}/>
                <Route path='/selected-group' component={GroupModal}/>
                <Route path='/awesome-group' component={GroupInfo}/> 
            </div>
        )
    }
}

export default App;

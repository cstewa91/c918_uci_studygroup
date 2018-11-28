import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import Create from './create_group/create-group';
import Profile from './profile/profile';
import EditCreated from './edit/edit-created';
import Hamburger from './general/hamburger';
import Search from './search/search-page';
import GroupModal from './general/group-modal';
import GroupInfo from './info/group-info';
import CreateAccount from './create_account/create-account';



class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/create-group" component={Create} />
                <Route path="/profile" component={Profile} />
                <Route path='/edit-group' component={EditCreated} />
                <Route path='/hamburger' component={Hamburger} />
                <Route path='/search-group' component={Search} />
                <Route path='/selected-group' component={GroupModal} />
<<<<<<< HEAD
                <Route path='/group-info' component={GroupInfo} />
=======
                <Route path='/api/groups/:group_id' component={GroupInfo} />
>>>>>>> 781e234505c2145540ca55c97bcecdf5fd33249a
                <Route path='/create-account' component={CreateAccount}/>
            </div>
        )
    }
}

export default App;

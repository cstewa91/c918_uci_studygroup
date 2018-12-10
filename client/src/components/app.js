import React, { Component, Fragment } from 'react';
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
import auth from '../hoc/auth'



class App extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={auth(Home)} />
                <Route path="/create-group" component={auth(Create)} />
                <Route path="/profile" component={auth(Profile)} />
                <Route path='/edit-group/:group_id' component={auth(EditCreated)} />
                <Route path='/hamburger' component={auth(Hamburger)} />
                <Route path='/search-group' component={Search} />
                <Route path='/selected-group' component={auth(GroupModal)} />
                <Route path='/group-info/:group_id' component={auth(GroupInfo)} />
                <Route path='/create-account' component={CreateAccount} />
            </Fragment>
        )
    }
}

export default App;

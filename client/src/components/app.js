import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Create from './create-group';
import Profile from './profile';
import EditCreated from './edit-created';
import Hamburger from './hamburger';

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
            </div>
        )
    }
}

export default App;

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './login'
import Home from './home'
import Create from './create-group'

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/create-group" component={Create} />
            </div>
        )
    }
}

export default App;

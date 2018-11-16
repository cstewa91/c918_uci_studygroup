import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import {Route} from 'react-router-dom';
import Hamburger from './hamburger';
import EditCreated from './edit-created';
import Profile from './profile';

const App = () => (
    <div>
        <div className="app">
            <h1>Welcome to Book Worms</h1>
            <Route path='/hamburger' component={Hamburger}/>
            <Route path='/edit-created' component={EditCreated}/>
            <Route path='/profile' component={Profile}/>
        </div>
    </div>
);

export default App;

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './search-page.css';
import Header from '../general/header'
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import GroupModal from '../general/group-modal';
import {getAllGroups} from '../../actions';
import { connect } from 'react-redux';

class SearchGroups extends Component{
    constructor(props){
        super(props)
    }
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
        this.props.getAllGroups();
    }

    render() {

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        const listAllGroups = this.props.all.map(item => {
            return (
                <GroupModal key={item.id} history={this.props.history} id={item.id} description={item.description} text={`${item.subject} ${item.course} ${item.name} ${item.start_time} - ${item.end_time} ${item.current_group_size}/${item.max_group_size}`}/>
            )
        });

        return (
            <div>
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <div className="main-content">
                    <h1>Search Groups</h1>
                    <div className="search-filter-container">
                        <input size="26" id="search-field" type="text" placeholder="Enter a group name or subject"/>
                        <button className="search-filter" type="submit">Filter</button>
                    </div>
                    <div id="search-results">
                        <ul>
                            {listAllGroups}
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        all: state.search.all
    }
}

export default connect(mapStateToProps, {
    getAllGroups: getAllGroups,
})(SearchGroups);

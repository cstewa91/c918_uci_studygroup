import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './search-page.css';
import Header from '../general/header'
import GroupModal from '../general/group-modal';
import {getAllGroups} from '../../actions';
import { connect } from 'react-redux';

class SearchGroups extends Component{
    componentDidMount() {
        this.props.getAllGroups();
    }
    render() {

        const listAllGroups = this.props.all.map(item => {
            return (
                <tr key={item.id}>
                    <td><Link to="/selected-group">{item.subject}</Link></td>
                    <td><Link to="/selected-group">{item.course}</Link></td>
                    <td><Link to="/selected-group">{item.name}</Link></td>
                    <td><Link to="/selected-group">{item.start_time} - {item.end_time}</Link></td>
                    <td><Link to="/selected-group">{item.current_group_size}/{item.max_group_size}</Link></td>
                </tr>
            )
        });


        return (
            <div>
                <Header/>
                <div className="main-content">
                    <Link to="/hamburger">Menu</Link>
                    <h1>Search Groups</h1>
                    <div className="search-filter-container">
                        <input id="search-field" type="text" placeholder="Enter a group name or subject"/>
                        <button className="search-filter" type="submit">Filter</button>
                    </div>
                    <div>
                    </div>
                    <table className="search-results">
                        <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Course</th>
                            <th width="200px">Group Name</th>
                            <th width="420px">Date/Time</th>
                            <th>Members</th>
                        </tr>
                        </thead>
                        <tbody>
                            {listAllGroups}
                        </tbody>
                    </table>
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

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './search-page.css';
import Header from '../general/header'
import GroupModal from '../general/group-modal';
import {getAllGroups} from '../../actions';
import { connect } from 'react-redux';

class SearchGroups extends Component{
    constructor(props){
        super(props)
    }

    // componentDidMount() {
    //     this.props.getAllGroups();
    // }

    render() {

        // const listAllGroups = this.props.all.map(item => {
        //     return (
        //         <div className="search-result">
        //             <li key={item.id}>
        //
        //             </li>
        //         </div>
        //     )
        // });

        // const listAllGroups = this.props.all.map(item => {
        //     return (
        //         <tr key={item.id}>
        //             <td>{item.subject}</td>
        //             <td>{item.course}</td>
        //             <td>{item.name}</td>
        //             <td>{item.start_time} - {item.end_time}</td>
        //             <td>{item.current_group_size}/{item.max_group_size}</td>
        //         </tr>
        //     )
        // });

        /*<table className="search-results">*/
        /*<thead>*/
        /*<tr>*/
        /*<th>Subject</th>*/
        /*<th>Course</th>*/
        /*<th width="200px">Group Name</th>*/
        /*<th width="420px">Date/Time</th>*/
        /*<th>Members</th>*/
        /*</tr>*/
        /*</thead>*/
        /*<tbody>*/
        /*{listAllGroups}*/
        /*</tbody>*/
        /*</table>*/





        return (
            <div>
                <Header/>
                <div className="main-content">
                    <Link to="/hamburger">Menu</Link>
                    <h1>Search Groups</h1>
                    <div className="search-filter-container">
                        <input size="26" id="search-field" type="text" placeholder="Enter a group name or subject"/>
                        <button className="search-filter" type="submit">Filter</button>
                    </div>
                    <div id="search-results">
                        <GroupModal/>


                    </div>

                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         all: state.search.all
//     }
// }

export default SearchGroups;

// export default connect(mapStateToProps, {
//     getAllGroups: getAllGroups,
// })(SearchGroups);

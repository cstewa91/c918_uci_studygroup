import React, {Component} from 'react';
import './search-page.css';
import Header from '../general/header'
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import { Field, reduxForm } from 'redux-form';
import GroupModal from '../general/group-modal';
import SearchInput from './search-input';
import {getAllGroups} from '../../actions';
import {filterResults} from '../../actions';
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

    handleFilterSubmit = (values) => {
        console.log('values', values);
        console.log('props of filter', this.props);
        this.props.filterResults(values.filter);
    }

    componentDidMount() {
        this.props.getAllGroups();
    }

    componentDidUpdate() {
        console.log("This is the new props ", this.props);
    }

    renderResults = () => {
        const resultType = (this.props.results && this.props.results.length) ? "results" : "all";

        const results = this.props[resultType].map(item => {
            const startDateTime = new Date(item.start_time);
            const endDateTime = new Date(item.end_time);

            const startingTime = startDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            const endingTime = endDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            const startDate = startDateTime.toLocaleDateString();

            return (
                <GroupModal key={item.id} history={this.props.history} id={item.id} description={item.description} text={`${item.subject}${item.course}: ${item.name} ${startDate} ${startingTime} - ${endingTime} ${item.current_group_size}/${item.max_group_size}`}/>
                //make these each an individual span
            )
        });

        return results;
    }

    render() {

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        const {handleSubmit} = this.props;

        return (
            <div>
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <div className="search-main-content">
                    <div className="search-filter-container">
                        <form onSubmit={handleSubmit(this.handleFilterSubmit)}>
                            <Field className="search-field" name="filter" label="Enter group name or subject" type="text" size="30" component={SearchInput}/>
                        </form>
                    </div>
                    <div id="search-results">
                        <p className="search-result-section"><span><b><u>Subject</u></b></span> <span><b><u>Group Name</u></b></span> <span><b><u>Date & Time</u></b></span> <span><b><u>Members</u></b></span></p>
                        <ul className="search-results">
                            { this.renderResults() }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        all: state.search.all,
        results: state.filter.results
    }
}

SearchGroups = reduxForm({
    form: 'search-results',
 })(SearchGroups);

export default connect(mapStateToProps, {
    getAllGroups: getAllGroups,
    filterResults: filterResults
})(SearchGroups);

import React, {Component, Fragment} from 'react';
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
        this.props.filterResults(values.filter);
    }

    componentDidMount() {
        this.props.getAllGroups();
    }

    componentDidUpdate() {


    }

    renderResults = () => {
        const resultType = (this.props.results && this.props.results.length) ? "results" : "all";
    
        const results = this.props[resultType].map(item => {
            const startDateTime = new Date(item.start_time);
            const endDateTime = new Date(item.end_time);
    
            const startingTime = startDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            const endingTime = endDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            const startDate = startDateTime.toLocaleDateString([], {month: '2-digit', day: '2-digit'});
    
            return (
                <GroupModal key={item.id} history={this.props.history} id={item.id} description={item.description}>
                    <Fragment key={item.id}>
                        <div className="search-results-body-cell">
                            {item.subject}{item.course}
                        </div>
                        <div className="search-results-body-cell search-body-cell">
                            {item.name}
                        </div>
                        <div className="search-results-body-cell">
                            {startDate}
                        </div>
                        <div className="search-results-body-cell">
                            {startingTime}
                        </div>
                        <div className="search-results-body-cell">
                            {<sup>{item.current_group_size}</sup>}&frasl;{<sub>{item.max_group_size}</sub>}
                        </div>
                    </Fragment>
                </GroupModal>
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
                        <div id="search-results-header">
                            <div className="search-results-head-cell">
                                <u>SUBJECT</u>
                            </div>
                            <div className="search-results-head-cell">
                                <u>NAME</u>
                            </div>
                            <div className="search-results-head-cell">
                                <u>DATE</u>
                            </div>
                            <div className="search-results-head-cell">
                                <u>TIME</u>
                            </div>
                            <div className="search-results-head-cell">
                                <u>SIZE</u>
                            </div>
                        </div>
                            { this.renderResults() }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
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

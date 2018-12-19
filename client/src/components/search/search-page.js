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

    adjustTime = (time) => {
        const splicedTime = time.slice(0,5);
        const splitTime = splicedTime.split(':');
        console.log(splitTime);
        console.log(splitTime[0]);
        if(splitTime[0] > 12){
            const hour = splitTime[0] - 12;
            splitTime[0] = hour;
            const joinedTime = splitTime.join(':');
            const pmTime = joinedTime + ' PM';
            return pmTime;
        } else if (splitTime[0] === '12') {
            const joinedTime = splitTime.join(':');
            const noonTime = joinedTime + ' PM';
            return noonTime;
        } else {
            const hour = splitTime[0];
            splitTime[0] = hour;
            const joinedTime = splitTime.join(':');
            const amTime = joinedTime + ' AM';
            return amTime;
        }
    }

    componentDidUpdate() {


    }

    renderResults = () => {
        const resultType = (this.props.results && this.props.results.length) ? "results" : "all";
    
        const results = this.props[resultType].map(item => {
            const newDate = new Date(item.date);
            const sliceStartDate = item.date.slice(0, 11) + item.start_time
            const sliceEndDate = item.date.slice(0, 11) + item.end_time
            const endTime = new Date(sliceEndDate);
            const startTime= new Date(sliceStartDate);
            const startingTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const endingTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const startDate = newDate.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
    
            return (
                <GroupModal key={item.id} history={this.props.history} id={item.id} description={item.description}>
                    <Fragment key={item.id}>
                        <div className="search-results-body-cell search-results-body-cell-left">
                            {item.subject}{item.course}
                        </div>
                        <div className="search-results-body-cell search-results-body-cell-center search-results-subject-data">
                            {item.name}
                        </div>
                        <div className="search-results-body-cell search-results-body-cell-center">
                            {startDate}
                        </div>
                        <div className="search-results-body-cell search-results-body-cell-center">
                            {startingTime}
                        </div>
                        <div className="search-results-body-cell search-results-body-cell-right">
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
                    <div className="search-results">
                        <div id="search-results-header">
                            <div className="search-results-head-cell">
                                <b><u>Subject</u></b>
                            </div>
                            <div className="search-results-head-cell">
                                <b><u>Name</u></b>
                            </div>
                            <div className="search-results-head-cell">
                                <b><u>Date</u></b>
                            </div>
                            <div className="search-results-head-cell">
                                <b><u>Time</u></b>
                            </div>
                            <div className="search-results-head-cell">
                                <b><u>Size</u></b>
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

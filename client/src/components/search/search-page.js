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
import home from '../../assets/images/home.png';


class SearchGroups extends Component{
    constructor(props){
        super(props)
    }

    state = {
        hamburgerOpen: false,
        searched: false,
        searchValue: ''
    }

    toggleHamburger = () => {
        this.setState((prevState) =>{
            return {
                hamburgerOpen: !prevState.hamburgerOpen
            }
        })
    }

    haveSearched = () => {
        this.setState({searched: true});
    }

    resetFilter = (values) => {
        console.log(this.props);
        values = '';
        this.handleFilterSubmit(values);
    }

    backdropHandler = () => {
        this.setState ({
            hamburgerOpen: false,
        })
    }

    handleFilterSubmit = (values) => {
        this.haveSearched();
        if(!values.filter){
            this.setState({searched: false})
        }
        this.setState({
            searchValue: values
        });
        console.log(this.state);
        this.props.filterResults(values.filter);
    }

    componentDidMount() {
        this.props.getAllGroups();
    }
    
    joinedGrpMarker(){
        const allGroups = this.props.all;
        for(i = 0; i < allGroups.length; i++){
            if(allGroups[i].joined === "True"){
                
            }
        }
    }

    componentDidUpdate() {


    }

    renderResults = () => {
        
        if(!this.props.results.length && this.state.searched){
            return (
                <div className="no-results">No results match the search term "{this.state.searchValue.filter}."</div>
            );
        }
        
        const resultType = (this.props.results && this.props.results.length) ? "results" : "all";
        
        let results = this.props[resultType].map(item => {
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
        console.log(this.props.all);

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        const {handleSubmit} = this.props;

        return (
            <div>
                <Header src={home} href={'/home'} hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <div className="search-main-content">
                    <div className="search-filter-container">
                        <form onSubmit={handleSubmit(this.handleFilterSubmit)}>
                            <Field {...this.props} resetFilter = {this.resetFilter} className="search-field" name="filter" label="Enter group name or subject" type="text" size="30" component={SearchInput}/>
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

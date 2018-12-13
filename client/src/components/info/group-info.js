import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions';
import NavButton from '../general/nav-button';
import './group-info.css';
import Header from '../general/header';
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';
import {getUserInfo} from '../../actions';
import {deleteGroup} from '../../actions';
import {leaveGroup} from '../../actions';


class GroupInfo extends Component{
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

    leaveCurrentGroup = async () => {
        await this.props.leaveGroup(this.props.match.params.group_id);
        this.props.history.push('/home');
    }

    deleteCurrentGroup = async () => {
        await this.props.deleteGroup(this.props.match.params.group_id)
        await this.props.history.push('/home')
    }

    renderButton = () =>{
        const {id} = this.props.user;
        const {user_id} = this.props.singleGroup;
        if(id === user_id){
            return(
                <Fragment>
                    <div className="update">
                        <NavButton to={`/edit-group/${this.props.match.params.group_id}`} text='EDIT GROUP'/>
                    </div>
                    <div className="delete-group">
                        <div className="btn delete-group-button" onClick={this.deleteCurrentGroup}>Delete Group</div>
                    </div>
                </Fragment>
                
            ) 
        }else{
            return(
                <div className="update">
                    <div className="btn leave-group-button" onClick={this.leaveCurrentGroup}>Leave Group</div>
                </div>
            )
        }
    }
    

    

    formatStartTime = (startTime) => {
        const formattedStartTime = startTime.toLocaleTimeString();
        return formattedStartTime;
    }

    componentDidMount(){
        this.props.getGroupDetails(this.props.match.params.group_id);
        this.props.getUserInfo();
    }


    render(){
        console.log('props', this.props)

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        
        const {name, subject, course, start_time, end_time, max_group_size, current_group_size, location, description, user_id } = this.props.singleGroup
        const startDateTime = new Date(start_time);
        const endDateTime = new Date(end_time);
        const startingTime = startDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const startDate = startDateTime.toLocaleDateString([], {month: '2-digit', day: '2-digit'});
        const endingTime = endDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        if(!{name}){
            return
            <h1>Loading...</h1>
        }

       

        return (
            <div className="edit-created">
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className="container group-details-content">                  
                        <div className="group-details">
                        <div className="group-details-name row group-details-header">
                            <h1>{name}</h1>
                        </div>
                            <form className="group-info">
                                <div className="group-info-subject form-group">                  
                                    <strong>Subject:</strong> {subject}{course}
                                </div>
                                <div className="group-info-date form-group">               
                                    <strong>Date:</strong> {startDate}
                                </div>
                                <div className="group-info-time form-group">                 
                                    <strong>Time:</strong> {`${startingTime} - ${endingTime}`}
                                </div>
                                <div className="group-info-users form-group">             
                                    <strong>Group Size:</strong> {`${current_group_size}/${max_group_size}`}
                                </div>
                                <div className="group-info-location form-group">                  
                                    <strong>Location:</strong> {location}
                                </div>
                                <div className="group-info-description-container">        
                                    {description}
                                </div>
                            </form>
                            {this.renderButton()}
                        </div>
                </main>
                <footer>
                        
                </footer>
            </div>
                )
        }
}

function mapStateToProps(state){
    return {
        singleGroup: state.editGroup.singleGroup,
        user: state.profile.user
    }
}

export default connect(mapStateToProps, {
    getGroupDetails: getGroupDetails,
    getUserInfo: getUserInfo,
    leaveGroup: leaveGroup,
    deleteGroup: deleteGroup
})(GroupInfo)


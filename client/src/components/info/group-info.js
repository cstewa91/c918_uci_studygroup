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
        console.log('stuff', this.props.match.params.group_id)
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
                    <div className='update'>
                        <NavButton to={`/edit-group/${this.props.match.params.group_id}`} text='Edit Group Details'/>
                    </div>
                    <div className='delete-group'>
                        <div className="btn btn-danger" onClick={this.deleteCurrentGroup}>Delete Group</div>
                    </div>
                </Fragment>
                
            ) 
        }else{
            return(
                <div className="update">
                    <div className="btn btn-danger leave-group" onClick={this.leaveCurrentGroup}>Leave Group</div>
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

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }

        
        const {name, subject, course, start_time, end_time, max_group_size, current_group_size, location, description, user_id } = this.props.singleGroup
        const startDateTime = new Date(start_time);
        const endDateTime = new Date(end_time);
        const startingTime = startDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const startDate = startDateTime.toLocaleDateString();
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
                <main className='main-content'>
                    <div className='container'>
                    
                        <div className='main-title group-name'>
                            <h1>{name}</h1>
                        </div>
                        <div className="group-details">
                        <form className='group-info'>
                                <div className='subject form-group'>                  
                                    <strong>Subject:</strong> {subject}{course}
                                </div>
                                <div className='date form-group'>               
                                    <strong>Date:</strong> {startDate}
                                </div>
                                <div className='time form-group'>                 
                                    <strong>Time:</strong> {`${startingTime} - ${endingTime}`}
                                </div>
                                <div className='users form-group'>             
                                    <strong>Group Size:</strong> {`${current_group_size}/${max_group_size}`}
                                </div>
                                <div className='location form-group'>                  
                                    <strong>Location:</strong> {location}
                                </div>
                                <div className='details'>        
                                    <strong>Description:</strong> {description}
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <footer>
                        {this.renderButton()}
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


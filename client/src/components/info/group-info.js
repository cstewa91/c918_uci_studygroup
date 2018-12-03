import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions';
import NavButton from '../general/nav-button';
import './group-info.css';
import Header from '../general/header';
import Hamburger from '../general/hamburger';
import Backdrop from '../general/backdrop';


class GroupInfo extends Component{
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

    componentDidMount(){

        this.props.getGroupDetails(this.props.match.params.group_id);
    }


    render(){

        let backdrop;

        if(this.state.hamburgerOpen){
            backdrop = <Backdrop click={this.backdropHandler}/>
        }


        const {name, subject, course, start_time, end_time, max_group_size, current_group_size, location, description } = this.props.singleGroup
    
        return (
            <div className="edit-created">
                <Header hamburgerClick = {this.toggleHamburger}/>  
                <Hamburger show={this.state.hamburgerOpen}/>
                {backdrop} 
                <main className='main-content'>
                    <div className='container'>
                    
                        <div className='main-title'>
                            <p className='edit-group'>Created Group Details:</p>
                        </div>

                        <div className="group-details">
                            <form className='group-info'>
                                <div className='group-name form-group'>
                                    <p>{name}</p>
                                </div>
                                <div className='subject form-group'>                  
                                    <p>{subject}</p>
                                </div>
                                <div className='course form-group'>                       
                                    <p>{course}</p>
                                </div>
                                <div className='date form-group'>               
                                    <p>{`${start_time}-${end_time}`}</p>
                                </div>
                                <div className='users form-group'>             
                                    <p>{`${current_group_size}-${max_group_size}`}</p>
                                </div>
                                <div className='time form-group'>                 
                                    <p>{`${start_time}-${end_time}`}</p>
                                </div>
                                <div className='location form-group'>                  
                                    <p>{location}</p>
                                </div>
                                <div className='details'>        
                                    <p>{description}</p>
                                </div>
                            </form>    
                        </div>
                    </div>
                </main>
                <footer>
                    <div className='update'>
                        <NavButton to={`/edit-group/${this.props.match.params.group_id}`} text='EDIT'/>
                    </div>
                </footer>
            </div>
                )
        }
}

function mapStateToProps(state){
    return {
        singleGroup: state.editGroup.singleGroup
    }
}

export default connect(mapStateToProps, {
    getGroupDetails: getGroupDetails,
})(GroupInfo)


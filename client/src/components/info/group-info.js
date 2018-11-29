import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getGroupDetails } from '../../actions';
import NavButton from '../general/nav-button';
import './group-info.css';
import Header from '../general/header';


class GroupInfo extends Component{

    componentDidMount(){
        console.log('mount', this.props.location.pathname.slice(-2));
        const groupId = this.props.location.pathname.slice(-2)
        this.props.getGroupDetails(groupId);
    }

    render(){
        console.log('render props', this.props.singleGroup)

        const {name, subject, course, start_time, end_time, max_group_size, current_group_size, location, description } = this.props.singleGroup

        // const adjustedDate = start_time.slice(6,10)  information is not sending fast enough
        return (
            <div className="edit-created">
                <Header/>   
                <main className='main-content'>
                    <div className='container'>
                    <Link to='/hamburger' className='btn blue'>Hamburger</Link>
                    
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
                                    <p>{start_time}</p>
                                </div>
                                <div className='users form-group'>             
                                    <p>{`${current_group_size}/${max_group_size}`}</p>
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
                        <NavButton to={`/edit-group`} text='UPDATE'/>
                    </div>
                </footer>
            </div>
                )
        }
}

function mapStateToProps(state){
    console.log('state', state)
    return {
        singleGroup: state.editGroup.singleGroup
    }
}

export default connect(mapStateToProps, {
    getGroupDetails: getGroupDetails,
})(GroupInfo)


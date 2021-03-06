import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJoinedGroups } from '../../actions';
import './confirm_modal.css';

class LeaveModal extends Component {
    state = {
        show: false
    };

    leaveCurrentGroup = async () => {
        await this.props.leaveGroup(this.props.match.params.group_id);
        await this.props.getJoinedGroups();
        this.props.history.push('/home');
    }

    open = () => this.setState({show: true});

    close = () => this.setState({show: false});

    render(){
        if(this.state.show){
            return (
                <div className="confirm-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="confirm-modal-content">
                        <div onClick={this.close} className="confirm-modal-close">&times;</div>
                        <h1 className="basic-modal-content-h1">
                            Leave Group
                        </h1>
                        <p>Are you sure?</p>
                        <div className="btn btn-lg confirm-delete" onClick={this.leaveCurrentGroup}>Leave</div>
                        <span className="divider-space"> </span>
                        <div onClick={this.close} className="btn btn-lg cancel-delete">Cancel</div>
                    </div>
                </div>
            )
        }

        return (
            <button onClick={this.open} className="btn btn-lg delete-group-button">LEAVE</button>
        );
    }
}

export default connect( null, {
    getJoinedGroups: getJoinedGroups
})(LeaveModal);

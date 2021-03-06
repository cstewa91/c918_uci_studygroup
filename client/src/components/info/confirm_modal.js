import React, { Component } from 'react';
import { getCreatedGroups } from '../../actions';
import { connect } from 'react-redux';
import './confirm_modal.css';

class ConfirmModal extends Component {
    state = {
        show: false
    };

    deleteCurrentGroup = async () => {
        await this.props.deleteGroup(this.props.match.params.group_id)
        await this.props.getCreatedGroups();
        await this.props.history.push('/home')
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
                            Delete Group
                        </h1>
                        <p>Are you sure?</p>
                        <div className="btn btn-lg confirm-delete" onClick={this.deleteCurrentGroup}>Delete</div>
                        <span className="divider-space"> </span>
                        <div onClick={this.close} className="btn btn-lg cancel-delete">Cancel</div>
                    </div>
                </div>
            )
        }

        return (
            <button onClick={this.open} className="btn btn-lg delete-group-button">DELETE</button>
        );
    }
}

export default connect( null, {
    getCreatedGroups: getCreatedGroups
})(ConfirmModal);

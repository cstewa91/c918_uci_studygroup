import React, { Component } from 'react';
import './confirm_modal.css';

class ConfirmModal extends Component {
    state = {
        show: false
    };

    deleteCurrentGroup = async () => {
        await this.props.deleteGroup(this.props.match.params.group_id)
        await this.props.history.push('/home')
    }

    open = () => this.setState({show: true});

    close = () => this.setState({show: false});

    render(){
        if(this.state.show){
            return (
                <div className="confirm-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="confirm-modal-content">
                        <div onClick={this.close} className="basic-modal-close">X</div>
                        <h1 className="basic-modal-content-h1">
                            Delete Group
                        </h1>
                        <p>Are you sure?</p>
                        <div className="btn confirm-delete" onClick={this.deleteCurrentGroup}>
                            Delete
                        </div>
                        <div onClick={this.close} className="btn cancel-delete">
                            Cancel
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <button onClick={this.open} className="btn btn-lg delete-group-button">DELETE GROUP</button>
        );
    }
}

export default ConfirmModal;
